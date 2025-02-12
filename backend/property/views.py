import os
import uuid
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, date

import requests
# ADOBE PDF IMPORTS
from adobe.pdfservices.operation.auth.service_principal_credentials import ServicePrincipalCredentials
from adobe.pdfservices.operation.exception.exceptions import ServiceApiException, ServiceUsageException, SdkException
from adobe.pdfservices.operation.pdf_services import PDFServices
from adobe.pdfservices.operation.pdf_services_media_type import PDFServicesMediaType
from adobe.pdfservices.operation.pdfjobs.jobs.document_merge_job import DocumentMergeJob
from adobe.pdfservices.operation.pdfjobs.params.documentmerge.document_merge_params import DocumentMergeParams
from adobe.pdfservices.operation.pdfjobs.params.documentmerge.output_format import OutputFormat
from adobe.pdfservices.operation.pdfjobs.result.document_merge_result import DocumentMergePDFResult
from django.core.mail import send_mail
from django_filters import rest_framework as filters
from rest_framework import status
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView, GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from booking.models import Booking
from project import settings
from property.filters import PropertyFilter
from property.models import Property, Amenity, Review, Comment
from property.permissions import IsHost, IsOwnerOrAdmin
from property.serializers import PropertySerializer, AmenitySerializer, ReviewSerializer, CommentSerializer
from user.permissions import IsNomad

# TODO: Delete client id and secret from here, store in secret variables or export on droplet
CREDENTIALS = ServicePrincipalCredentials(
    client_id='x',
    client_secret='y',
)

pdf_services = PDFServices(credentials=CREDENTIALS)


class GenerateContractPdf(GenericAPIView):
    lookup_url_kwarg = 'property_id'
    permission_classes = [IsNomad]

    def post(self, request, *args, **kwargs):
        try:
            start_date = request.data.get('start_date')
            end_date = request.data.get('end_date')
            token = request.data.get('access_token')

            if not start_date or not end_date:
                return Response({"error": "Both start_date and end_date are required."},
                                status=status.HTTP_400_BAD_REQUEST)

            property_id = self.kwargs[self.lookup_url_kwarg]
            property = Property.objects.get(id=property_id)
            nomad = self.request.user.nomad_profile
            host = property.host.user

            if getattr(nomad, 'host_profile', None):
                return Response({"error": "You are not allowed to book as a host."})

            with ThreadPoolExecutor(max_workers=2) as executor:
                contract_future = executor.submit(self.generate_contract_pdf, property, nomad, host, start_date,
                                                  end_date)
                invoice_future = executor.submit(self.generate_invoice_pdf, property, nomad, host, start_date, end_date)

                contract_pdf_url = contract_future.result()
                invoice_pdf_url = invoice_future.result()

            if not token:
                return Response({"error": "Failed to retrieve access token."},
                                status=status.HTTP_400_BAD_REQUEST)

            agreement_id = self.create_agreement(token, contract_pdf_url, nomad.user.email)

            if not agreement_id:
                return Response({"error": "Failed to create agreement."},
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            booking_response = self.create_booking(start_date, end_date, property, nomad)

            if isinstance(booking_response, Response):
                return booking_response

            self.send_signing_email(property.name, nomad.user.email, invoice_pdf_url)

            return Response({
                "message": "Contract send to your email",
            }, status=status.HTTP_200_OK)

        except Property.DoesNotExist:
            return Response({"error": "Property not found."}, status=status.HTTP_400_BAD_REQUEST)
        except ValueError as ve:
            return Response({"error": str(ve)}, status=status.HTTP_400_BAD_REQUEST)
        except (ServiceApiException, ServiceUsageException, SdkException) as e:
            return Response({"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def create_booking(self, start_date, end_date, property, nomad):
        try:
            start_date = datetime.strptime(start_date, '%d.%m.%Y').date()
            end_date = datetime.strptime(end_date, '%d.%m.%Y').date()
        except ValueError:
            return Response({"error": "Invalid date format. Please use 'DD.MM.YYYY' format."},
                            status=status.HTTP_400_BAD_REQUEST)

        booked_dates = Booking.objects.filter(property=property, start_date__lte=end_date, end_date__gte=start_date)

        days = (end_date - start_date).days

        if booked_dates.exists():
            return Response({"error": "Booking already exists."}, status=status.HTTP_400_BAD_REQUEST)

        if days < 27 or days > 84:
            return Response({"error": "Properties can only be booked for 4 to 12 weeks"},
                            status=status.HTTP_400_BAD_REQUEST)

        booking = Booking.objects.create(property=property,
                                         created_by=nomad,
                                         start_date=start_date,
                                         end_date=end_date,
                                         booking_status="pending")

        return booking

    def calculate_total_price(self, start_date_str, end_date_str, price_per_day):
        start_date = datetime.strptime(start_date_str, '%d.%m.%Y')
        end_date = datetime.strptime(end_date_str, '%d.%m.%Y')

        delta = end_date - start_date
        total_days = delta.days

        if total_days < 0:
            raise ValueError("End date must be after start date.")

        total_price = total_days * price_per_day

        return total_price

    def generate_contract_pdf(self, property, nomad, host, start_date, end_date):
        contract_template_path = os.path.join(settings.BASE_DIR, 'property', 'pdf_template', 'ContractProperty.docx')

        with open(contract_template_path, 'rb') as file:
            contract_input_stream = file.read()

        input_asset = pdf_services.upload(input_stream=contract_input_stream, mime_type=PDFServicesMediaType.DOCX)

        total_price = self.calculate_total_price(start_date, end_date, price_per_day=property.price)
        date_today = date.today()
        formatted_date = date_today.strftime('%d.%m.%Y')

        contract_json_data = {
            "contract_number": str(uuid.uuid4()),
            "nomad_first_name": nomad.user.first_name,
            "nomad_last_name": nomad.user.last_name,
            "host_first_name": host.first_name,
            "host_last_name": host.last_name,
            "property_address": property.street,
            "start_date": start_date,
            "end_date": end_date,
            "total_price": f"${total_price}",
            "date_today": formatted_date,
        }

        contract_merge_params = DocumentMergeParams(
            json_data_for_merge=contract_json_data,
            output_format=OutputFormat.PDF,
        )

        contract_merge_job = DocumentMergeJob(
            input_asset=input_asset,
            document_merge_params=contract_merge_params,
        )

        contract_location = pdf_services.submit(contract_merge_job)
        contract_response = pdf_services.get_job_result(contract_location, DocumentMergePDFResult)
        contract_result_asset = contract_response.get_result().get_asset()
        contract_stream_asset = pdf_services.get_content(contract_result_asset)

        contract_output_dir = os.path.join(settings.MEDIA_ROOT, 'contracts', nomad.user.email)
        if not os.path.exists(contract_output_dir):
            os.makedirs(contract_output_dir, exist_ok=True)

        contract_output_path = os.path.join(contract_output_dir, f'Contract_{property.id}_{nomad.user.email}.pdf')
        with open(contract_output_path, 'wb') as file:
            file.write(contract_stream_asset.get_input_stream())
        media = "media-files/" if settings.DEBUG else "/media-files/"
        return os.path.join(media, 'contracts', nomad.user.email,
                            f'Contract_{property.id}_{nomad.user.email}.pdf')

    def generate_invoice_pdf(self, property, nomad, host, start_date, end_date):
        invoice_template_path = os.path.join(settings.BASE_DIR, 'property', 'pdf_template', 'InvoiceTemplate.docx')

        with open(invoice_template_path, 'rb') as file:
            invoice_input_stream = file.read()

        invoice_json_data = {
            "contract_number": str(uuid.uuid4()),
            "nomad_first_name": nomad.user.first_name,
            "nomad_last_name": nomad.user.last_name,
            "host_first_name": host.first_name,
            "host_last_name": host.last_name,
            "date_today": date.today().strftime('%d.%m.%Y'),
            "property_address": property.street,
            "start_date": start_date,
            "end_date": end_date,
            "amount_payable": f"${28 * property.price}",
            "payable_by": start_date,
        }

        invoice_merge_params = DocumentMergeParams(
            json_data_for_merge=invoice_json_data,
            output_format=OutputFormat.PDF,
        )

        invoice_input_asset = pdf_services.upload(invoice_input_stream, mime_type=PDFServicesMediaType.DOCX)

        invoice_merge_job = DocumentMergeJob(
            input_asset=invoice_input_asset,
            document_merge_params=invoice_merge_params,
        )

        invoice_location = pdf_services.submit(invoice_merge_job)
        invoice_response = pdf_services.get_job_result(invoice_location, DocumentMergePDFResult)
        invoice_result_asset = invoice_response.get_result().get_asset()
        invoice_stream_asset = pdf_services.get_content(invoice_result_asset)

        invoice_output_dir = os.path.join(settings.MEDIA_ROOT, 'invoices', nomad.user.email)
        if not os.path.exists(invoice_output_dir):
            os.makedirs(invoice_output_dir, exist_ok=True)

        invoice_output_path = os.path.join(invoice_output_dir, f'Invoice_{property.id}_{nomad.user.email}.pdf')
        with open(invoice_output_path, 'wb') as file:
            file.write(invoice_stream_asset.get_input_stream())

        return os.path.join(settings.WEBSITE_URL, settings.MEDIA_URL, 'invoices', nomad.user.email,
                            f'Invoice_{property.id}_{nomad.user.email}.pdf')

    def upload_document_to_adobe_sign(self, access_token, document_path):
        url = "https://api.eu2.adobesign.com/api/rest/v6/transientDocuments"
        headers = {
            'Authorization': f'Bearer {access_token}',
        }

        # Read the PDF file to upload
        with open(document_path, 'rb') as file:
            file_data = file.read()

        files = {
            'File': ('ContractProperty.pdf', file_data, 'application/pdf')
        }

        response = requests.post(url, headers=headers, files=files)

        if response.status_code == 201:
            transient_document_id = response.json()['transientDocumentId']
            return transient_document_id
        else:
            print("Error uploading document:", response.text)
            return None

    def create_agreement(self, access_token, document_path, recipient_email):
        transient_document_id = self.upload_document_to_adobe_sign(access_token, document_path)

        if not transient_document_id:
            return None

        url = "https://api.eu2.adobesign.com:443/api/rest/v6/agreements"
        headers = {
            'Authorization': f'Bearer {access_token}',
        }

        data = {
            "fileInfos": [{"transientDocumentId": transient_document_id}],
            "name": "Reservation Contract",
            "participantSetsInfo": [
                {
                    "order": 1,
                    "role": "SIGNER",
                    "memberInfos": [
                        {"email": recipient_email}
                    ]
                }
            ],
            "signatureType": "ESIGN",
            "state": "IN_PROCESS"
        }

        response = requests.post(url, headers=headers, json=data)

        if response.status_code == 201:
            agreement_id = response.json()['id']

            return agreement_id
        else:
            print("Error creating agreement:", response.text)
            return None

    def get_signing_url(self, agreement_id, access_token):
        url = f"https://api.eu2.adobesign.com:443/api/rest/v6/agreements/{agreement_id}/signingUrls"

        headers = {
            'Authorization': f'Bearer {access_token}'
        }

        response = requests.get(url, headers=headers)

        if response.status_code == 200:
            signing_url = response.json()['signingUrlSetInfos'][0]['signingUrls'][0]['esignUrl']
            return signing_url
        else:
            print("Error getting signing URL:", response.text)
            return None

    def send_signing_email(self, property_name, guest_email, invoice_url):
        sender_email = os.getenv('DEFAULT_FROM_EMAIL')
        send_mail(
            f'Invoice For The Renting {property_name}',
            f'Invoice link: {invoice_url}',
            sender_email,
            [guest_email],
            fail_silently=False
        )


class AmenityListView(ListAPIView):
    queryset = Amenity.objects.all()
    serializer_class = AmenitySerializer
    permission_classes = (AllowAny,)


class RetrieveCreatePropertyView(ListCreateAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = (IsHost,)
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = PropertyFilter

    def get_queryset(self):
        return super().get_queryset()


class PropertyDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = [IsOwnerOrAdmin]
    lookup_url_kwarg = 'property_id'

    def get_object(self):
        property_id = self.kwargs[self.lookup_url_kwarg]
        return Property.objects.get(id=property_id)


class ListUsersPropertiesView(ListAPIView):
    serializer_class = PropertySerializer
    permission_classes = (IsOwnerOrAdmin,)

    def get_queryset(self):
        return Property.objects.filter(host=self.request.user.host_profile)


class ListReviewsView(GenericAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsNomad, IsHost]

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class CreateReviewView(GenericAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsNomad]
    lookup_url_kwarg = "property_id"

    def post(self, request, *args, **kwargs):
        if not hasattr(request.user, "nomad_profile"):
            return Response({"error": "Only nomads can leave reviews."},
                            status=status.HTTP_403_FORBIDDEN)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(created_by=request.user.nomad_profile)
        return Response(serializer.data)


class ListUpdateDeleteReviewView(RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    lookup_url_kwarg = "review_id"


class ListNomadReviews(ListAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [IsNomad]

    def get_queryset(self):
        return Review.objects.filter(created_by=self.request.user.nomad_profile)


class ListCommentsView(ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsHost]


class CreateCommentView(GenericAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsHost]
    lookup_url_kwarg = "review_id"

    def post(self, request, review_id, *args, **kwargs):
        if not hasattr(request.user, "host_profile"):
            return Response({"error": "Only hosts can comment reviews"},
                            status=status.HTTP_403_FORBIDDEN)

        data = request.data.copy()
        data['review'] = review_id

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class ListUpdateDeleteCommentView(RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    lookup_url_kwarg = "comment_id"


class FavouritePropertyToggleView(GenericAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = [IsNomad]
    lookup_url_kwarg = "property_id"

    def post(self, request, *args, **kwargs):
        property = self.get_object()
        nomad_user = self.request.user.nomad_profile

        if property in nomad_user.favourite_properties.all():
            nomad_user.favourite_properties.remove(property)
            nomad_user.save()
            return Response(status=status.HTTP_200_OK)
        else:
            nomad_user.favourite_properties.add(property)
            nomad_user.save()
            return Response(status=status.HTTP_200_OK)


class RetrieveUsersFavouritePropertiesView(GenericAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = [IsNomad]

    def get(self, request, *args, **kwargs):
        properties = self.request.user.nomad_profile.favourite_properties.all()
        serializer = self.get_serializer(properties, many=True)
        return Response(serializer.data)

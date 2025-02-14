import os
import uuid
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, date

#import requests

from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib import colors

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

from booking.models import Booking
from project import settings
from property.filters import PropertyFilter
from property.models import Property, Amenity, Review, Comment
from property.permissions import IsHost, IsOwnerOrAdmin
from property.serializers import PropertySerializer, AmenitySerializer, ReviewSerializer, CommentSerializer
from user.permissions import IsNomad


class GenerateContractPdf(GenericAPIView):
    lookup_url_kwarg = 'property_id'
    permission_classes = [IsNomad]

    def post(self, request, *args, **kwargs):
        try:
            start_date = request.data.get('start_date')
            end_date = request.data.get('end_date')

            if not start_date or not end_date:
                return Response({"error": "Both start_date and end_date are required."},
                                status=status.HTTP_400_BAD_REQUEST)

            property_id = self.kwargs[self.lookup_url_kwarg]
            property = Property.objects.get(id=property_id)
            nomad = self.request.user.nomad_profile
            host = property.host.user

            if getattr(nomad, 'host_profile', None):
                return Response({"error": "You are not allowed to book as a host."})

            booking_response = self.create_booking(start_date, end_date, property, nomad)
            if isinstance(booking_response, Response):
                return booking_response

            with ThreadPoolExecutor(max_workers=2) as executor:
                contract_future = executor.submit(self.generate_contract_pdf, property, nomad, host, start_date, end_date)
                invoice_future = executor.submit(self.generate_invoice_pdf, property, nomad, host, start_date, end_date)

                contract_pdf_url = contract_future.result()
                invoice_pdf_url = invoice_future.result()

            self.send_signing_email(property.name, nomad.user.email, invoice_pdf_url)

            return Response({
                "message": "Contract sent to your email",
                "contract_pdf": contract_pdf_url,
                "invoice_pdf": invoice_pdf_url
            }, status=status.HTTP_200_OK)

        except Property.DoesNotExist:
            return Response({"error": "Property not found."}, status=status.HTTP_400_BAD_REQUEST)

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
        total_days = (end_date - start_date).days

        if total_days < 0:
            raise ValueError("End date must be after start date.")

        return total_days * price_per_day

    def generate_contract_pdf(self, property, nomad, host, start_date, end_date):
        contract_output_dir = os.path.join(settings.MEDIA_ROOT, 'contracts', nomad.user.email)
        os.makedirs(contract_output_dir, exist_ok=True)

        contract_output_path = os.path.join(contract_output_dir, f'Contract_{property.id}_{nomad.user.email}.pdf')
        total_price = self.calculate_total_price(start_date, end_date, price_per_day=property.price)
        date_today = date.today().strftime('%d.%m.%Y')

        c = canvas.Canvas(contract_output_path, pagesize=letter)
        c.setFont("Helvetica", 12)
        c.drawString(100, 750, f"Contract Number: {uuid.uuid4()}")
        c.drawString(100, 730, f"Property: {property.name}")
        c.drawString(100, 710, f"Address: {property.street}")
        c.drawString(100, 690, f"Host: {host.first_name} {host.last_name}")
        c.drawString(100, 670, f"Nomad: {nomad.user.first_name} {nomad.user.last_name}")
        c.drawString(100, 650, f"Start Date: {start_date}")
        c.drawString(100, 630, f"End Date: {end_date}")
        c.drawString(100, 610, f"Total Price: CHF{total_price}")
        c.drawString(100, 590, f"Date Created: {date_today}")
        c.setStrokeColor(colors.blue)
        c.line(100, 570, 500, 570)
        c.drawString(100, 550, "Signature (Host): __________________________")
        c.drawString(100, 530, "Signature (Nomad): __________________________")
        c.save()

        return os.path.join(settings.MEDIA_URL, 'contracts', nomad.user.email, f'Contract_{property.id}_{nomad.user.email}.pdf')

    def generate_invoice_pdf(self, property, nomad, host, start_date, end_date):
        invoice_output_dir = os.path.join(settings.MEDIA_ROOT, 'invoices', nomad.user.email)
        os.makedirs(invoice_output_dir, exist_ok=True)

        invoice_output_path = os.path.join(invoice_output_dir, f'Invoice_{property.id}_{nomad.user.email}.pdf')
        total_price = self.calculate_total_price(start_date, end_date, price_per_day=property.price)

        c = canvas.Canvas(invoice_output_path, pagesize=letter)
        c.setFont("Helvetica-Bold", 16)
        c.drawString(200, 750, "INVOICE")
        c.setFont("Helvetica", 12)
        c.drawString(100, 700, f"Invoice Number: {uuid.uuid4()}")
        c.drawString(100, 680, f"Date: {date.today().strftime('%d.%m.%Y')}")
        c.drawString(100, 660, f"Billed To: {nomad.user.first_name} {nomad.user.last_name}")
        c.drawString(100, 640, f"Property: {property.name}")
        c.drawString(100, 620, f"Address: {property.street}")
        c.drawString(100, 600, f"Rental Period: {start_date} to {end_date}")
        c.drawString(100, 580, f"Total Amount Due: CHF {total_price}")
        c.setStrokeColor(colors.red)
        c.line(100, 560, 500, 560)
        c.drawString(100, 540, f"Payment Due By: {start_date}")
        c.save()

        return os.path.join(settings.MEDIA_URL, 'invoices', nomad.user.email, f'Invoice_{property.id}_{nomad.user.email}.pdf')

    def send_signing_email(self, property_name, guest_email, invoice_url):
        sender_email = os.getenv('DEFAULT_FROM_EMAIL')
        full_invoice_url = f"{settings.WEBSITE_URL}{invoice_url}"
        send_mail(
            f'Invoice for Renting {property_name}',
            f'Invoice link: {full_invoice_url}',
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

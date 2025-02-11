import uuid

from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.generics import GenericAPIView, CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from project import settings
from user.models import RegistrationProfile
from user.serializers.auth import RegisterUserSerializer, RegisterNomadSerializer, RegisterHostSerializer, \
    RequestPasswordResetSerializer, PasswordResetValidateSerializer

User = get_user_model()


class RegisterView(GenericAPIView):
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = RegisterUserSerializer(data=request.data)

        if serializer.is_valid():
            email = serializer.validated_data['email']

            if not email:
                return Response({"error": "Email is required."}, status=status.HTTP_400_BAD_REQUEST)

            registration_profile, reg_profile_created = RegistrationProfile.objects.get_or_create(email=email)

            if registration_profile.is_validated:
                return Response({"message": "Email already registered."}, status=status.HTTP_400_BAD_REQUEST)

            if reg_profile_created or not registration_profile.code:
                registration_profile.code = uuid.uuid4()
                registration_profile.save()

                print(registration_profile.code, "CODEEEEEEEE")

                send_mail(
                    "Your code to validate your email",
                    f"Code: {registration_profile.code}",
                    settings.DEFAULT_FROM_EMAIL,
                    [email],
                    fail_silently=False,
                )

            return Response({"message": "Validation code sent."}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RegisterNomadView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = RegisterNomadSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": "Nomad registered successfully."}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RegisterHostView(CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = RegisterHostSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Host registered successfully."}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RequestPasswordResetView(GenericAPIView):
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = RequestPasswordResetSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']

            user = get_object_or_404(User, email=email)

            user.password_reset_code = uuid.uuid4()
            user.save()

            send_mail(
                'Your code to reset your password',
                f'Please use the following code to reset your password: {user.password_reset_code}',
                settings.DEFAULT_FROM_EMAIL,
                [email],
                fail_silently=False,
            )

            return Response({"message": "Password reset code sent."}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PasswordResetValidateView(GenericAPIView):
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = PasswordResetValidateSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            new_user_password = serializer.validated_data['new_password']

            user.set_password(new_user_password)
            user.password_reset_code = None
            user.save()

            return Response({"message": "Password has been reset successfully."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

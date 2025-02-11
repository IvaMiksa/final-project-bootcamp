from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from user.models import NomadProfile, HostProfile
from user.serializers.user import HostSerializer, NomadSerializer, UserSerializer

User = get_user_model()


class UserDetailView(RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user

    def get_profile(self):
        user = self.get_object()
        if user.user_type == User.NOMAD:
            return NomadProfile.objects.get(user=user)
        elif user.user_type == User.HOST:
            return HostProfile.objects.get(user=user)
        return user

    def get_serializer_class(self):
        user = self.get_object()
        if user.user_type == User.HOST:
            return HostSerializer
        elif user.user_type == User.NOMAD:
            return NomadSerializer
        return UserSerializer

    def get(self, request, *args, **kwargs):
        user = self.get_profile()

        serializer = self.get_serializer_class()(user)
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        user = self.get_profile()
        serializer = self.get_serializer_class()(user, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        profile = self.get_profile()

        if isinstance(profile, NomadProfile) or isinstance(profile, HostProfile):
            profile.user.delete()

        profile.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

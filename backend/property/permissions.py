from django.contrib.auth import get_user_model
from rest_framework import permissions

User = get_user_model()


class IsOwnerOrAdmin(permissions.BasePermission):
    """
    Custom permission to only allow owners of a property or admins to edit or delete it.
    """

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.host == request.user.host_profile or request.user.is_staff


class IsHost(permissions.BasePermission):
    """
    Custom permission to only allow hosts to create properties.
    """

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True

        return request.user.is_authenticated and request.user.user_type == User.HOST

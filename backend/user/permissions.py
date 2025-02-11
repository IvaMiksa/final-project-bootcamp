from rest_framework import permissions
from rest_framework.permissions import BasePermission, SAFE_METHODS

from user.models import User


class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.method in SAFE_METHODS or
            request.user and
            request.user.is_staff
        )
        # if request.method in SAFE_METHODS:
        #   return True
        # return request.is_authenticated


# class ReadOnly(BasePermission):
#   def has_object_permission(self, request, view, obj):
#      #return request.method in SAFE_METHODS
#     if request.method in SAFE_METHODS:
#        return True
#   return obj.author == request.user

class IsEmployee(BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.email.endswith('@yourcompany.com')
        )


class IsNomad(permissions.BasePermission):
    """
    Custom permission to only allow nomad to CRUD bookings
    """

    def has_permission(self, request, view):
        # Allow safe methods for any authenticated user
        if request.method in permissions.SAFE_METHODS:
            return request.user.is_authenticated

        # Only allow CRUD operations for users with user_type 'NOMAD'
        return request.user.is_authenticated and request.user.user_type == User.NOMAD


class IsAuthenticatedOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.method in SAFE_METHODS or
            request.user and
            request.user.is_staff
        )

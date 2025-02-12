import os
from django.contrib import admin
from django.contrib.auth import get_user_model
from django.core.mail import send_mail

from .models import NomadProfile, HostProfile, RegistrationProfile

User = get_user_model()


class AdminSite(admin.AdminSite):
    site_header = 'Nomadly Admin Dashboard'
    site_title = 'Nomadly Admin Dashboard'


admin.site = AdminSite()


def send_verification_status_update_email(user):
    sender_email = os.getenv('DEFAULT_FROM_EMAIL')
    subject = 'Your Verification Status Has Been Updated'
    message = f'Your verification has been {user.verification_status} .'
    recipient_list = [user.email]
    send_mail(subject, message, sender_email, recipient_list)


class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'first_name', 'last_name', 'user_type')
    search_fields = ('email', 'first_name', 'last_name')

    def save_model(self, request, obj, form, change):

        if not change:
            super().save_model(request, obj, form, change)
            return

        user = User.objects.get(id=obj.id)

        if user.verification_status != obj.verification_status and obj.verification_status != "pending":
            send_verification_status_update_email(obj)

        super().save_model(request, obj, form, change)


class NomadProfileAdmin(admin.ModelAdmin):
    list_display = ('user_email', 'about_me')

    def user_email(self, obj):
        return obj.user.email

    user_email.short_description = 'Email'


class HostProfileAdmin(admin.ModelAdmin):
    list_display = ('user_email',)

    def user_email(self, obj):
        return obj.user.email

    user_email.short_description = 'Email'


admin.site.register(User, UserAdmin)
admin.site.register(NomadProfile, NomadProfileAdmin)
admin.site.register(HostProfile, HostProfileAdmin)
admin.site.register(RegistrationProfile)

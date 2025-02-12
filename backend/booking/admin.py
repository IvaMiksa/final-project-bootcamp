import os
from django.contrib import admin
from django.core.mail import send_mail

from .models import Booking


def send_booking_status_update_email(booking):
    subject = 'Your Booking Status Has Been Updated'
    message = f'Your booking has been {booking.booking_status}.'
    recipient_list = [booking.created_by.user.email]
    sender_email = os.getenv('DEFAULT_FROM_EMAIL')
    send_mail(subject, message, sender_email, recipient_list)


class BookingAdmin(admin.ModelAdmin):
    list_display = ("property", "start_date", "end_date", "created_at")

    def save_model(self, request, obj, form, change):

        if not change:
            super().save_model(request, obj, form, change)
            return

        old_booking = Booking.objects.get(id=obj.id)

        if old_booking.booking_status != obj.booking_status and obj.created_by and obj.booking_status != "pending":
            send_booking_status_update_email(obj)

        super().save_model(request, obj, form, change)


admin.site.register(Booking, BookingAdmin)

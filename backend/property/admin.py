import os
from django.contrib import admin
from django.core.mail import send_mail

from .models import Property, Amenity, PropertyImage, Review, Comment


def send_verification_update_email(property):
    subject = f'Your Property Verification Status For {property.name} Has Been Updated'
    message = f'Your property verification has been {property.verification} .'
    recipient_list = [property.host.user.email]
    sender_email = os.getenv('DEFAULT_FROM_EMAIL')
    send_mail(subject, message, sender_email, recipient_list)


class PropertyAdmin(admin.ModelAdmin):
    list_display = ("name", "country", "street", "floor_number", "size", "price")
    search_fields = ('name',)

    def save_model(self, request, obj, form, change):

        if not change:
            super().save_model(request, obj, form, change)
            return

        property = Property.objects.get(id=obj.id)

        if property.verification != obj.verification and obj.verification != "pending":
            send_verification_update_email(obj)

        super().save_model(request, obj, form, change)


class AmenityAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_required', "icon")
    search_fields = ('name',)


class PropertyImageAdmin(admin.ModelAdmin):
    list_display = ("content", "property")
    search_fields = ('property',)


class ReviewAdmin(admin.ModelAdmin):
    list_display = ("content", "property", "rating", "created")
    search_fields = ('property',)


class CommentAdmin(admin.ModelAdmin):
    list_display = ("content", "review")
    search_fields = ("review",)


admin.site.register(Property, PropertyAdmin)
admin.site.register(Amenity, AmenityAdmin)
admin.site.register(PropertyImage, PropertyImageAdmin)
admin.site.register(Review, ReviewAdmin)
admin.site.register(Comment, CommentAdmin)

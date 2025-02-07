from django.utils import timezone
from rest_framework import serializers

from user.serializers.user import NomadSerializer
from .models import Booking


# First, update the BookingSerializer
class BookingSerializer(serializers.ModelSerializer):
    created_by = NomadSerializer(read_only=True)

    class Meta:
        model = Booking
        fields = ['id', 'property', 'start_date', 'end_date', 'created_at', 'created_by', 'booking_status']
        read_only_fields = ['created_by', 'created_at', "property"]

    def validate(self, data):
        # Get the instance for updates
        instance = self.instance
        start_date = data.get('start_date', getattr(instance, 'start_date', None))
        end_date = data.get('end_date', getattr(instance, 'end_date', None))

        if start_date and end_date:
            # Validate date order
            if start_date >= end_date:
                raise serializers.ValidationError({
                    "dates": "End date must be after start date"
                })

            # Validate dates are in the future
            if start_date <= timezone.now().date():
                raise serializers.ValidationError({
                    "dates": "Start date must be in the future"
                })

        return data

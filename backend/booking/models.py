import uuid

from django.db import models

from property.models import Property
from user.models import NomadProfile


class Booking(models.Model):
    PENDING = "pending"
    ACCEPTED = "accepted"
    REJECTED = "rejected"
    COMPLETED = "completed"

    booking_status_choices = (
        (PENDING, "Pending"),
        (ACCEPTED, "Accepted"),
        (REJECTED, "Rejected"),
        (COMPLETED, "Completed")
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    created_by = models.ForeignKey(NomadProfile, on_delete=models.CASCADE, blank=True, null=True)
    property = models.ForeignKey(Property, on_delete=models.CASCADE, blank=True, null=True, related_name="bookings")
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    booking_status = models.CharField(max_length=255, choices=booking_status_choices, default=PENDING)

    def __str__(self):
        nomad_name = self.created_by.user.get_full_name() if self.created_by else 'Unnamed Booking'
        property_name = self.property.name if self.property else 'Unknown Property'
        return f"{nomad_name} in {property_name}"

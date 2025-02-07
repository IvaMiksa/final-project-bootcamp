import uuid

from django.db import models

from user.models import HostProfile, NomadProfile

ONE_STAR = 1
TWO_STARS = 2
THREE_STARS = 3
FOUR_STARS = 4
FIVE_STARS = 5

rating_choices = (
    (ONE_STAR, "One star"),
    (TWO_STARS, "Two stars"),
    (THREE_STARS, "Three stars"),
    (FOUR_STARS, "Four stars"),
    (FIVE_STARS, "Five stars")
)


class Amenity(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    icon = models.FileField(blank=True, null=True, upload_to='amenity/icons/')
    is_required = models.BooleanField(blank=True, null=True)


class Property(models.Model):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"

    verification_choices = (
        (PENDING, "Pending"),
        (APPROVED, "Approved"),
        (REJECTED, "Rejected"),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=255, blank=True, null=True)
    country = models.CharField(max_length=255, blank=True, null=True)
    post_code = models.CharField(max_length=10, blank=True, null=True)
    street = models.CharField(max_length=100, blank=True, null=True)
    floor_number = models.CharField(max_length=3, blank=True, null=True)
    apartment_name_or_number = models.CharField(max_length=100, blank=True, null=True)
    apartment_block_number = models.CharField(max_length=5, blank=True, null=True)
    size = models.CharField(max_length=30, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    price = models.PositiveIntegerField(default=0, blank=True, null=True)
    maintenance_dates = models.DateField(blank=True, null=True)
    amenities = models.ManyToManyField(Amenity, related_name="properties", blank=True)
    host = models.ForeignKey(HostProfile, on_delete=models.CASCADE, blank=True, null=True)
    verification = models.CharField(max_length=20, choices=verification_choices, default=PENDING)

    def __str__(self):
        return f"{self.name or 'Unnamed Property'} in {self.city or 'Unknown City'}"


class Review(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    property = models.ForeignKey(Property, on_delete=models.CASCADE, blank=True, null=True, related_name="reviews")
    content = models.TextField(blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    rating = models.IntegerField(choices=rating_choices, blank=True, null=True)
    created_by = models.ForeignKey(NomadProfile, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return "Review"


class PropertyImage(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    content = models.ImageField(blank=True, null=True)
    property = models.ForeignKey(Property, on_delete=models.CASCADE, blank=True, null=True, related_name="images")


class Comment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    content = models.TextField(null=True, blank=True)
    review = models.OneToOneField(Review, on_delete=models.CASCADE, related_name="comment", null=True, blank=True)

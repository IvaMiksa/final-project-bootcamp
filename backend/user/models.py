import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models

from .utils.upload_paths import (avatar_image_path,
                                 passport_image_path,
                                 proof_of_work_file_path,
                                 visas_image_path,
                                 proof_of_ownership_file_path)


class User(AbstractUser):
    ADMIN = 'admin'
    HOST = 'host'
    NOMAD = 'nomad'

    user_type_choices = (
        (ADMIN, 'Admin'),
        (HOST, 'Host'),
        (NOMAD, 'Nomad'),
    )

    PENDING = "pending"
    ACCEPTED = "accepted"
    REJECTED = "rejected"

    verification_status_choices = (
        (PENDING, "Pending"),
        (ACCEPTED, "Accepted"),
        (REJECTED, "Rejected"),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    user_type = models.CharField(max_length=20, choices=user_type_choices)
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    date_of_birth = models.DateField(blank=True, null=True)
    country = models.CharField(max_length=50, blank=True, null=True)
    phone_number = models.CharField(max_length=50, blank=True, null=True)
    nationality = models.CharField(max_length=50, blank=True, null=True)
    avatar = models.ImageField(upload_to=avatar_image_path, blank=True, null=True)
    passport_image = models.ImageField(passport_image_path, blank=True, null=True)
    password_reset_code = models.UUIDField(default=uuid.uuid4, blank=True, null=True)
    verification_status = models.CharField(max_length=20, choices=verification_status_choices, default=PENDING)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', ]

    def save(self, *args, **kwargs):
        if self.is_superuser:
            self.user_type = self.ADMIN
        super().save(*args, **kwargs)


class RegistrationProfile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True,
                                related_name='registration_profile')
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_validated = models.BooleanField(default=False)
    code = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)


class NomadProfile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="nomad_profile")
    proof_of_work = models.FileField(upload_to=proof_of_work_file_path, blank=True, null=True)
    visa = models.ImageField(upload_to=visas_image_path, blank=True, null=True)
    about_me = models.TextField(blank=True, null=True)
    favourite_properties = models.ManyToManyField("property.Property", related_name="nomad", blank=True)

    def __str__(self):
        return self.user.get_full_name() or self.user.username

    def save(self, *args, **kwargs):
        self.user.user_type = User.NOMAD
        self.user.save()
        super().save(*args, **kwargs)


class HostProfile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='host_profile')
    proof_of_ownership = models.FileField(upload_to=proof_of_ownership_file_path, blank=True, null=True)

    def save(self, *args, **kwargs):
        self.user.user_type = User.HOST
        self.user.save()
        super().save(*args, **kwargs)

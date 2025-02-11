import uuid

from django.contrib.auth import get_user_model
from django.db import models

from property.models import Property
from report.utils.report_upload_paths import reports_image_path

User = get_user_model()


class Report(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    property = models.ForeignKey(Property, on_delete=models.CASCADE, blank=True, null=True, related_name="reports")
    title = models.CharField(max_length=255, blank=True, null=True)
    attachment = models.ImageField(blank=True, null=True, upload_to=reports_image_path)
    context = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Report"
        verbose_name_plural = "Reports"

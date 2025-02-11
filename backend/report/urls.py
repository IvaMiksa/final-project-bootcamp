from django.urls import path

from report.views import CreateReportView, RetrievePropertyReportsView

urlpatterns = [
    path("", CreateReportView.as_view(), name="report"),
    path("property/<uuid:property_id>/", RetrievePropertyReportsView.as_view(), name="retrieve_property_reports"),
]

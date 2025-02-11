from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated

from report.models import Report
from report.serializers import ReportSerializer


class CreateReportView(CreateAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class RetrievePropertyReportsView(ListAPIView):
    serializer_class = ReportSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        property_id = self.kwargs['property_id']
        return Report.objects.filter(property_id=property_id)

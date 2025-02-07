from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from django.utils.dateparse import parse_date
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from property.models import Property
from user.permissions import IsAdminOrReadOnly
from user.permissions import IsNomad
from .models import Booking
from .serializers import BookingSerializer

User = get_user_model()


class ListAdminBookingsViews(GenericAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class CreatingBookingView(GenericAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsNomad]

    def post(self, request, property_id, *args, **kwargs):
        property_instance = get_object_or_404(Property, id=property_id)
        start_date = parse_date(request.data["start_date"])
        end_date = parse_date(request.data["end_date"])
        days_difference = end_date - start_date

        if not hasattr(request.user, "nomad_profile"):
            return Response({"error": "Only nomads can make bookings."},
                            status=status.HTTP_403_FORBIDDEN)

        booked_dates = Booking.objects.filter(
            property=property_instance,
            start_date__lte=request.data["end_date"],
            end_date__gte=request.data["start_date"]
        )

        if booked_dates.exists():
            return Response({"error": "Property is already booked for these dates."},
                            status=status.HTTP_409_CONFLICT)

        if days_difference.days < 28 or days_difference.days > 84:
            return Response({"error": "Properties can only be booked for 4 to 12 weeks."},
                            status=status.HTTP_400_BAD_REQUEST)

        if days_difference.days % 7 != 0:
            return Response({"error": "Properties can only be booked for full weeks."},
                            status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(created_by=request.user.nomad_profile, property=property_instance)
        return Response(serializer.data)


class ListBooking(GenericAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsNomad, IsAuthenticated]

    def get(self, request, booking_id, *args, **kwargs):
        booking_instance = get_object_or_404(Booking, id=booking_id)
        serializer = self.get_serializer(booking_instance)
        return Response(serializer.data)


class ListNomadBookingsView(GenericAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsNomad, IsAuthenticated]

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset().filter(created_by=request.user.nomad_profile)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

from django.urls import path

from .views import ListAdminBookingsViews, CreatingBookingView, ListBooking, ListNomadBookingsView

urlpatterns = [
    path("", ListAdminBookingsViews.as_view()),
    path("create-booking/<uuid:property_id>/", CreatingBookingView.as_view()),
    path("booking/<uuid:booking_id>/", ListBooking.as_view()),
    path("me/", ListNomadBookingsView.as_view())
]

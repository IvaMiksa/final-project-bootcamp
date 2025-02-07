from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

BASE_URL = "backend/api/"

urlpatterns = [
                  path(BASE_URL + "admin/", admin.site.urls),
                  path(BASE_URL + 'auth/token/', TokenObtainPairView.as_view()),
                  path(BASE_URL + 'auth/token/refresh/', TokenRefreshView.as_view()),
                  path(BASE_URL + 'auth/token/verify/', TokenVerifyView.as_view()),
                  path(BASE_URL + "users/", include("user.urls")),
                  path(BASE_URL + "reports/", include("report.urls")),
                  path(BASE_URL + "bookings/", include("booking.urls")),
                  path(BASE_URL + "property/", include("property.urls"))
              ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

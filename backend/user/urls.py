from django.urls import path, include

from user.views.auth import RegisterView, RegisterNomadView, RegisterHostView, RequestPasswordResetView, \
    PasswordResetValidateView
from user.views.user import UserDetailView

auth_patterns = [
    path('registration/', RegisterView.as_view(), name='auth-registration', ),
    path('registration/validate/nomad/', RegisterNomadView.as_view(), name='auth-registration-validate-nomad', ),
    path('registration/validate/host/', RegisterHostView.as_view(), name='auth-registration-validate-host', ),
    path('password-reset/', RequestPasswordResetView.as_view(), name='auth-password-reset', ),
    path('password-reset/validate/', PasswordResetValidateView.as_view(), name='auth-password-reset-validate', ),
]

urlpatterns = [
    path('auth/', include(auth_patterns)),
    path('me/', UserDetailView.as_view(), name='user-detail', ),
]

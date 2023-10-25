##
# Libs
##
from django.urls import path, re_path
from rest_framework import routers
from dj_rest_auth.views import (
    LoginView,
    LogoutView,
    PasswordChangeView,
    PasswordResetConfirmView,
    PasswordResetView,
    UserDetailsView,
)
from dj_rest_auth.registration.views import (
    RegisterView,
    VerifyEmailView,
    ResendEmailVerificationView,
)
from django.views.generic import TemplateView
from rest_framework_simplejwt.views import TokenVerifyView
from dj_rest_auth.jwt_auth import get_refresh_view

###
# Routers
###
router = routers.DefaultRouter()

###
# URLs
###
urlpatterns = [
    # Register
    path(
        "register/",
        RegisterView.as_view(),
        name="rest_register"
    ),
    path(
        "resend-email/",
        ResendEmailVerificationView.as_view(),
        name="rest_resend_email"
    ),
    path(
        "verify-email/",
        VerifyEmailView.as_view(),
        name="rest_verify_email"
    ),
    re_path(
        "account-confirm-email/(?P<key>[-:\w]+)/$",
        VerifyEmailView.as_view(),
        name='account_confirm_email',
    ),
    path(
        "account-email-verification-sent/",
        TemplateView.as_view(),
        name="account_email_verification_sent",
    ),

    # Password
    path(
        "password/reset/",
        PasswordResetView.as_view(),
        name="rest_password_reset"
    ),
    path(
        "password/reset/confirm/<str:uidb64>/<str:token>",
        PasswordResetConfirmView.as_view(),
        name="password_reset_confirm",
    ),
    path(
        "password/change/",
        PasswordChangeView.as_view(),
        name="rest_password_change"
    ),

    # Login
    path(
        "login/",
        LoginView.as_view(),
        name="rest_login"
    ),
    path(
        "logout/",
        LogoutView.as_view(),
        name="rest_logout"
    ),
    path(
        "user/",
        UserDetailsView.as_view(),
        name="rest_user_details"
    ),

    # Token
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('token/refresh/', get_refresh_view().as_view(), name='token_refresh'),

]

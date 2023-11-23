"""
API V1: Accounts Serializers
"""
###
# Libs
###
from dj_rest_auth.serializers import PasswordResetSerializer
from dj_rest_auth.registration.serializers import RegisterSerializer
from app.accounts.forms import CustomResetPasswordForm
from rest_framework import serializers


###
# Serializers
###
class CustomRegisterSerializer(RegisterSerializer):
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)

    def custom_signup(self, request, user):
        user.first_name = self.validated_data.get('first_name', '')
        user.last_name = self.validated_data.get('last_name', '')
        user.save(update_fields=['first_name', 'last_name'])


class CustomPasswordResetSerializer(PasswordResetSerializer):
    password_reset_form_class = CustomResetPasswordForm

    def get_email_options(self):
        return {
            'subject_template_name': 'account/reset/password_reset_subject.txt',
            'email_template_name': 'account/reset/password_reset_message.txt',
            'html_email_template_name': 'account/reset/password_reset_message.html',
        }

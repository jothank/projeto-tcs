"""
API V1: Accounts Serializers
"""
###
# Libraries
###
from dj_rest_auth.serializers import PasswordResetSerializer
from app.accounts.forms import CustomResetPasswordForm


###
# Serializers
###
class CustomPasswordResetSerializer(PasswordResetSerializer):
    password_reset_form_class = CustomResetPasswordForm

    def get_email_options(self):
        return {
            'subject_template_name': 'accounts/password_reset_subject.txt',
            'email_template_name': 'accounts/password_reset_message.txt',
            'html_email_template_name': 'accounts/password_reset_message.html',
        }

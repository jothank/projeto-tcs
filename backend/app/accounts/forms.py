"""
Accounts Form
"""
###
# Libs
###
from django.contrib.auth.forms import PasswordResetForm
from settings import settings
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode as uid_decoder

###
# Forms
###


class CustomResetPasswordForm(PasswordResetForm):
    def send_mail(self, subject_template_name, email_template_name,
                  context, from_email, to_email, html_email_template_name=None):
        """
        Sends a django.core.mail.EmailMultiAlternatives to `to_email`.
        """
        uid = force_str(uid_decoder(context.get("uid")))
        reset_url = f'{settings.FE_URL}/password-reset-cofirm/{uid}/{context.get("token")}'

        context.update({
            'reset_url': reset_url,
        })
        return super().send_mail(
            subject_template_name=subject_template_name,
            email_template_name=email_template_name,
            context=context,
            from_email=from_email,
            to_email=to_email,
            html_email_template_name=html_email_template_name
        )

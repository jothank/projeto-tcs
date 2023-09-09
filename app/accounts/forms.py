"""
Accounts Form
"""
###
# Libraries
###
from django.contrib.auth.forms import PasswordResetForm, UserCreationForm
from settings import settings
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode as uid_decoder
from django.core.mail import send_mail
from django.template.loader import render_to_string
from app.accounts.models.user import EmailConfirmation

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
        reset_url = f'{settings.FE_URL}/accounts/password/reset/confirm/{uid}/{context.get("token")}'

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

class CustomRegisterForm(UserCreationForm):
    def save(self, request):
        user = super().save(request)
        user.is_customer = True
        user.save()
        self.send_registration_email(user)
        return user

    def send_registration_email(self, user):
        email_confirmation = EmailConfirmation.objects.create(user=user)
        token = email_confirmation.token

        context = {
            'user': user,
            'token': token,
            # Adicione o link de confirmação (ajuste conforme necessário)
            'confirmation_link': f'{settings.FE_URL}/confirm-email/{token}/',
        }
        subject = render_to_string('accounts/registration_subject.txt', context).strip()
        message = render_to_string('accounts/registration_message.txt', context)
        html_message = render_to_string('accounts/registration_message.html', context)

        from_email = 'your_email@example.com'
        send_mail(subject, message, from_email, [user.email], html_message=html_message)
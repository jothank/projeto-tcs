from django.http import HttpResponse
from app.accounts.models.user import EmailConfirmation

def confirm_email(request, token):
    try:
        email_confirmation = EmailConfirmation.objects.get(token=token)
        user = email_confirmation.user
        user.is_active = True  # Ativar o usuário após confirmar o e-mail
        user.save()
        email_confirmation.delete()  # Exclua o token após usar, pois não é mais necessário
        return HttpResponse("E-mail confirmado com sucesso!")
    except EmailConfirmation.DoesNotExist:
        return HttpResponse("Token inválido ou já utilizado.")

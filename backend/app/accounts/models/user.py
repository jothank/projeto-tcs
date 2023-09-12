###
# Libs
###
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext as _
from django.db import models
from django.utils.crypto import get_random_string

###
# Model
###

class User(AbstractUser):
    groups = models.ManyToManyField(
        'auth.Group',
        blank=True,
        help_text=_('The groups this user belongs to. A user will get all permissions granted to each of their groups.'),
        related_name='custom_user_set',  # New related_name
        verbose_name=_('groups'),
    )

    user_permissions = models.ManyToManyField(
        'auth.Permission',
        blank=True,
        help_text=_('Specific permissions for this user.'),
        related_name='custom_user_set',  # New related_name
        verbose_name=_('user permissions'),
    )

class EmailConfirmation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=100, unique=True, default=get_random_string)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username} - {self.token}'

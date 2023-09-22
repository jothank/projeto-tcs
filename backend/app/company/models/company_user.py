###
# Libs
###
from django.utils.translation import gettext as _
from django.db import models
from app.accounts.models.user import User
from app.company.models.company import Company


###
# Model
###
class CompanyUser(models.Model):

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        verbose_name=_("Company"),
        related_name="company_user"
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name=_("User"),
        related_name="user_company"
    )
    is_owner = models.BooleanField(
        default=False,
        verbose_name=_("Is Onwer"),
    )

###
# Libs
###
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.translation import gettext_lazy as _
from django.db.models.signals import pre_delete
from app.fixed_expense.models.fixed_expense import FixedExpense
from app.fixed_expense.models.expense_fixed_expense import FixedExpenseCost
from app.cost.models.cost import Cost


###
# Signals
###
@receiver(post_save, sender=Cost)
def update_fixed_expense_total_price(sender, instance, **kwargs):

    fixed_expenses = instance.fixed_expense_cost.all(
    ).values_list('fixed_expense', flat=True)

    for fixed_expense_id in fixed_expenses:
        fixed_expense = FixedExpense.objects.get(id=fixed_expense_id)

        total_price = sum(exp.price for exp in fixed_expense.costs.all())
        fixed_expense.total_price = total_price
        fixed_expense.save()


@receiver(pre_delete, sender=Cost)
def expense_delete(sender, instance, **kwargs):
    fixed_expense_costs = FixedExpenseCost.objects.filter(
        cost=instance)

    for fee in fixed_expense_costs:
        fixed_expense = fee.fixed_expense

        fixed_expense.total_price -= instance.price
        fixed_expense.save(update_fields=['total_price'])

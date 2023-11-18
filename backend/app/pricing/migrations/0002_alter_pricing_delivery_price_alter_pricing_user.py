# Generated by Django 4.2.3 on 2023-11-08 20:42

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('pricing', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pricing',
            name='delivery_price',
            field=models.FloatField(blank=True, null=True, verbose_name='Delivery Price'),
        ),
        migrations.AlterField(
            model_name='pricing',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='User'),
        ),
    ]
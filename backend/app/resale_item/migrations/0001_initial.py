# Generated by Django 4.2.3 on 2023-09-24 22:09

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ResaleItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Name')),
                ('description', models.TextField(blank=True, help_text='Description', null=True, verbose_name='Description')),
                ('purchase_price', models.FloatField(verbose_name='Purchase Price')),
            ],
        ),
    ]

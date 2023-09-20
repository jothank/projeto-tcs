# Generated by Django 4.2.3 on 2023-09-16 02:29

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='FixedExpense',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(verbose_name='Date')),
                ('name', models.CharField(help_text='Name', max_length=255, verbose_name='Name')),
                ('value', models.DecimalField(decimal_places=2, help_text='Value', max_digits=10, verbose_name='Value')),
                ('description', models.TextField(blank=True, help_text='Description', null=True, verbose_name='Description')),
            ],
        ),
    ]

# Generated by Django 4.2.3 on 2023-10-08 19:28

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True, verbose_name='Name')),
                ('cnpj', models.CharField(max_length=255, unique=True, verbose_name='CNPJ')),
                ('email', models.CharField(max_length=255, verbose_name='Email')),
                ('phone', models.CharField(max_length=255, verbose_name='Phone')),
                ('street', models.CharField(max_length=255, verbose_name='Street')),
                ('number', models.CharField(max_length=255, verbose_name='Number')),
                ('neighborhood', models.CharField(max_length=255, verbose_name='Neighborhood')),
                ('city', models.CharField(max_length=255, verbose_name='City')),
                ('state', models.CharField(max_length=255, verbose_name='State')),
                ('country', models.CharField(max_length=255, verbose_name='Country')),
                ('zipcode', models.CharField(max_length=255, verbose_name='Zipcode')),
            ],
        ),
        migrations.CreateModel(
            name='CompanyUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_owner', models.BooleanField(default=False, verbose_name='Is Onwer')),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='company_user', to='company.company', verbose_name='Company')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_company', to=settings.AUTH_USER_MODEL, verbose_name='User')),
            ],
        ),
        migrations.AddField(
            model_name='company',
            name='users',
            field=models.ManyToManyField(related_name='companies', through='company.CompanyUser', to=settings.AUTH_USER_MODEL, verbose_name='Users'),
        ),
    ]

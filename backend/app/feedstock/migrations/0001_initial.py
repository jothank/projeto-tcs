# Generated by Django 4.2.3 on 2023-10-02 23:31

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='feedstock',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='Name')),
                ('price', models.FloatField(verbose_name='Price')),
                ('quantity', models.FloatField(verbose_name='Quantity')),
                ('unit', models.CharField(max_length=20, verbose_name='Unit')),
            ],
        ),
    ]

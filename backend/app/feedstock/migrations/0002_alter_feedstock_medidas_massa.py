# Generated by Django 4.2.3 on 2023-09-19 18:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('utils', '0001_initial'),
        ('feedstock', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='feedstock',
            name='medidas_massa',
            field=models.ManyToManyField(related_name='feedstocks', to='utils.unit'),
        ),
    ]
# Generated by Django 4.2.3 on 2023-09-19 18:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('feedstock', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Name')),
                ('quantity', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='Quantity')),
                ('feedstock', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='feedstock.feedstock', verbose_name='Feedstock')),
            ],
        ),
    ]

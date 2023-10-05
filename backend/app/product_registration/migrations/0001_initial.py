# Generated by Django 4.2.3 on 2023-10-05 17:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('product', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProductRegistration',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Name')),
                ('producion_price', models.FloatField(verbose_name='Production Price')),
            ],
        ),
        migrations.CreateModel(
            name='ProductRegistrationProduct',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='product_product_registration', to='product.product', verbose_name='Product')),
                ('product_registration', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='product_registration_product', to='product_registration.productregistration', verbose_name='Product Registration')),
            ],
        ),
        migrations.AddField(
            model_name='productregistration',
            name='products',
            field=models.ManyToManyField(related_name='products', through='product_registration.ProductRegistrationProduct', to='product.product', verbose_name='Products'),
        ),
    ]

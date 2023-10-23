# Generated by Django 4.2.3 on 2023-10-23 14:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('supply', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Name')),
                ('price', models.FloatField(verbose_name='Price')),
            ],
        ),
        migrations.CreateModel(
            name='ProductSupply',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='supply_product', to='product.product', verbose_name='Product')),
                ('supply', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='product_supply', to='supply.supply', verbose_name='Product')),
            ],
        ),
        migrations.AddField(
            model_name='product',
            name='supplies',
            field=models.ManyToManyField(related_name='supplies', through='product.ProductSupply', to='supply.supply', verbose_name='Supplies'),
        ),
    ]

# Generated by Django 4.2.3 on 2023-10-18 17:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('combo', '0001_initial'),
        ('product', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Pricing',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tax', models.FloatField(verbose_name='Tax')),
                ('card_tax', models.FloatField(verbose_name='Card Tax')),
                ('other', models.FloatField(verbose_name='Other')),
                ('profit', models.FloatField(verbose_name='Profit')),
                ('suggested_price', models.FloatField(verbose_name='Suggested Price')),
                ('delivery_price', models.FloatField(verbose_name='Delivery Price')),
                ('condominium', models.FloatField(verbose_name='Condominium')),
                ('combo', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='combo.combo', verbose_name='Combo')),
                ('product', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='product.product', verbose_name='Product')),
            ],
        ),
    ]

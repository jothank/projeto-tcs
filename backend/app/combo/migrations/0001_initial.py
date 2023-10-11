# Generated by Django 4.2.3 on 2023-10-11 16:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('product', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Combo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Name')),
                ('purchase_price', models.FloatField(verbose_name='Purchase price')),
            ],
        ),
        migrations.CreateModel(
            name='ComboProduct',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('combo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='combo_product', to='combo.combo', verbose_name='Combo')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='product_combo', to='product.product', verbose_name='Products')),
            ],
        ),
        migrations.AddField(
            model_name='combo',
            name='products',
            field=models.ManyToManyField(related_name='combo', through='combo.ComboProduct', to='product.product', verbose_name='Products'),
        ),
    ]

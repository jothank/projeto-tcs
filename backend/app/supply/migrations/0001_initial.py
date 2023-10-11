# Generated by Django 4.2.3 on 2023-10-11 16:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('feedstock', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Supply',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.FloatField(verbose_name='Quantity')),
                ('unit', models.CharField(max_length=255, verbose_name='Unit')),
                ('price', models.FloatField(verbose_name='Price')),
                ('feedstock', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='feedstock.feedstock', verbose_name='feedstock')),
            ],
        ),
    ]

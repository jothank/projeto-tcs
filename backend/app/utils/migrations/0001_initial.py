# Generated by Django 4.2.3 on 2023-10-08 19:28

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Unit',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('nome', models.CharField(choices=[('Quilo', 'Quilo'), ('Volume', 'Volume'), ('Unidade', 'Unidade')], max_length=100)),
            ],
        ),
    ]

# Generated by Django 4.2.5 on 2023-09-19 09:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('telegrams', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='telegram',
            name='receiver',
            field=models.EmailField(max_length=50),
        ),
        migrations.AlterField(
            model_name='telegram',
            name='sender',
            field=models.EmailField(max_length=50),
        ),
    ]

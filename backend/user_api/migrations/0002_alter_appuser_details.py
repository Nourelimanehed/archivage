# Generated by Django 4.2.5 on 2023-09-20 20:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appuser',
            name='details',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]

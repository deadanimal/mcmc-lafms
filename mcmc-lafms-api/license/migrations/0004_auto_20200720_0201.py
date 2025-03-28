# Generated by Django 2.2.6 on 2020-07-20 02:01

import core.helpers
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('license', '0003_license_count_no'),
    ]

    operations = [
        migrations.AddField(
            model_name='license',
            name='company_name',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name='license',
            name='document1',
            field=models.ImageField(blank=True, null=True, upload_to=core.helpers.PathAndRename('images')),
        ),
        migrations.AddField(
            model_name='license',
            name='reg_date',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]

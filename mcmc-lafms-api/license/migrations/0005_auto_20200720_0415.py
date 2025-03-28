# Generated by Django 2.2.6 on 2020-07-20 04:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('license', '0004_auto_20200720_0201'),
    ]

    operations = [
        migrations.AlterField(
            model_name='license',
            name='address',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='license',
            name='company_name',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='license',
            name='count_no',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='license',
            name='email',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='license',
            name='fax',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='license',
            name='general_description',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='license',
            name='mobile_number',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='license',
            name='name',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='license',
            name='nric',
            field=models.CharField(default='NA', max_length=12, null=True),
        ),
        migrations.AlterField(
            model_name='license',
            name='office_number',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='license',
            name='reg_date',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='license',
            name='signature',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]

# Generated by Django 2.2.6 on 2020-07-20 13:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('license', '0008_auto_20200720_0938'),
    ]

    operations = [
        migrations.AddField(
            model_name='license',
            name='note',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='license',
            name='application_status',
            field=models.CharField(choices=[('NA', 'New Application'), ('RE', 'Reviewed'), ('RJ', 'Rejected'), ('EV', 'Evaluated'), ('AP', 'Approved'), ('CO', 'Completed'), ('EX', 'Expired')], default='NA', max_length=2),
        ),
    ]

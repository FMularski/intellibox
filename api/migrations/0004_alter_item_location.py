# Generated by Django 3.2.7 on 2021-10-04 17:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20211004_1648'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='location',
            field=models.CharField(blank=True, max_length=1024),
        ),
    ]

# Generated by Django 3.2.7 on 2021-10-08 15:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_auto_20211005_2219'),
    ]

    operations = [
        migrations.AddField(
            model_name='box',
            name='size',
            field=models.BigIntegerField(blank=True, default=0),
            preserve_default=False,
        ),
    ]
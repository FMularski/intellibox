# Generated by Django 3.2.7 on 2021-10-08 15:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_box_size'),
    ]

    operations = [
        migrations.AlterField(
            model_name='box',
            name='size',
            field=models.BigIntegerField(blank=True, default=0),
        ),
    ]

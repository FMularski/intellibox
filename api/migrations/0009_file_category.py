# Generated by Django 3.2.7 on 2021-10-05 16:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_file_extension'),
    ]

    operations = [
        migrations.AddField(
            model_name='file',
            name='category',
            field=models.CharField(blank=True, max_length=16),
        ),
    ]

# Generated by Django 3.2.7 on 2021-10-04 14:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20211004_1105'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='item',
            name='parent_box',
        ),
        migrations.AddField(
            model_name='box',
            name='parent_box',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='inner_boxes', to='api.box'),
        ),
        migrations.AddField(
            model_name='file',
            name='parent_box',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='inner_files', to='api.box'),
            preserve_default=False,
        ),
    ]

# Generated by Django 3.2.7 on 2021-10-03 21:51

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('location', models.CharField(max_length=1024)),
                ('last_modified', models.DateTimeField(auto_now_add=True)),
                ('is_deleted', models.BooleanField(default=False)),
                ('is_favourite', models.BooleanField(default=False)),
                ('size', models.DecimalField(decimal_places=2, max_digits=10)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Box',
            fields=[
                ('item_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='boxes.item')),
            ],
            bases=('boxes.item',),
        ),
        migrations.CreateModel(
            name='File',
            fields=[
                ('item_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='boxes.item')),
                ('url', models.URLField(max_length=1024)),
            ],
            bases=('boxes.item',),
        ),
        migrations.AddField(
            model_name='item',
            name='parent_box',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='boxes.box'),
        ),
    ]

# Generated by Django 5.1.2 on 2024-10-31 21:55

import uuid

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Amenity',
            fields=[
                ('id',
                 models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('name', models.CharField(blank=True, max_length=255, null=True)),
                ('is_required', models.BooleanField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Property',
            fields=[
                ('id',
                 models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('country', models.CharField(blank=True, max_length=255, null=True)),
                ('post_code', models.CharField(blank=True, max_length=10, null=True)),
                ('street', models.CharField(blank=True, max_length=100, null=True)),
                ('floor_number', models.CharField(blank=True, max_length=3, null=True)),
                ('apartment_name_or_number', models.CharField(blank=True, max_length=100, null=True)),
                ('apartment_block_number', models.CharField(blank=True, max_length=5, null=True)),
                ('size', models.CharField(blank=True, max_length=30, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('price', models.PositiveIntegerField(blank=True, default=0, null=True)),
                ('maintenance_dates', models.DateField(blank=True, null=True)),
                ('amenities', models.ManyToManyField(blank=True, related_name='properties', to='property.amenity')),
                ('host', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE,
                                           to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='PropertyImage',
            fields=[
                ('id',
                 models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('content', models.ImageField(blank=True, null=True, upload_to='')),
                ('property', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE,
                                               related_name='images', to='property.property')),
            ],
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id',
                 models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('content', models.TextField(blank=True, null=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('rating', models.IntegerField(blank=True,
                                               choices=[(1, 'One star'), (2, 'Two stars'), (3, 'Three stars'),
                                                        (4, 'Four stars'), (5, 'Five stars')], null=True)),
                ('property', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE,
                                               related_name='reviews', to='property.property')),
            ],
        ),
    ]

# Generated by Django 5.1.2 on 2024-11-12 18:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('property', '0008_property_verification'),
        ('user', '0004_user_verification_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='nomadprofile',
            name='favourite_properties',
            field=models.ManyToManyField(blank=True, related_name='nomad', to='property.property'),
        ),
    ]

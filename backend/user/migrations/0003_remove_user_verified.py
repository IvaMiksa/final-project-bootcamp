# Generated by Django 5.1.2 on 2024-11-12 14:16

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ('user', '0002_user_verified'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='verified',
        ),
    ]

from django.contrib.auth import get_user_model
from rest_framework import serializers

from user.models import NomadProfile, HostProfile

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = [
            "password_reset_code",
            "password",
            'groups',
            'user_permissions',
            'is_staff',
            'is_superuser',
            'last_login',
            'is_active'
        ]


class HostSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', required=False)
    email = serializers.EmailField(source='user.email', required=False)
    first_name = serializers.CharField(source='user.first_name', required=False)
    last_name = serializers.CharField(source='user.last_name', required=False)
    date_of_birth = serializers.DateField(source='user.date_of_birth', required=False)
    country = serializers.CharField(source='user.country', required=False)
    phone_number = serializers.CharField(source='user.phone_number', required=False)
    nationality = serializers.CharField(source='user.nationality', required=False)
    avatar = serializers.ImageField(source='user.avatar', required=False)
    passport_image = serializers.ImageField(source='user.passport_image', required=False)
    user_type = serializers.CharField(source='user.user_type', required=False, read_only=True)
    verification_status = serializers.CharField(source='user.verification_status', required=False, read_only=True)

    class Meta:
        model = HostProfile
        fields = [
            'id', 'proof_of_ownership',
            'username', 'email', 'first_name', 'last_name',
            'date_of_birth', 'country', 'phone_number', 'nationality',
            'avatar', 'passport_image', 'user_type', 'verification_status'
        ]

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if user_data:
            for attr, value in user_data.items():
                setattr(instance.user, attr, value)
            instance.user.save()

        return instance


class NomadSerializer(serializers.ModelSerializer):
    user_type = serializers.CharField(source='user.user_type', required=False, read_only=True)
    username = serializers.CharField(source='user.username', required=False)
    email = serializers.EmailField(source='user.email', required=False)
    first_name = serializers.CharField(source='user.first_name', required=False)
    last_name = serializers.CharField(source='user.last_name', required=False)
    date_of_birth = serializers.DateField(source='user.date_of_birth', required=False)
    country = serializers.CharField(source='user.country', required=False)
    phone_number = serializers.CharField(source='user.phone_number', required=False)
    nationality = serializers.CharField(source='user.nationality', required=False)
    avatar = serializers.ImageField(source='user.avatar', required=False)
    passport_image = serializers.ImageField(source='user.passport_image', required=False)
    verification_status = serializers.CharField(source='user.verification_status', required=False, read_only=True)

    class Meta:
        model = NomadProfile
        fields = [
            'id', 'proof_of_work', 'visa', 'about_me',
            'username', 'email', 'first_name', 'last_name',
            'date_of_birth', 'country', 'phone_number', 'nationality',
            'avatar', 'passport_image', 'user_type', 'verification_status'
        ]

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if user_data:
            for attr, value in user_data.items():
                setattr(instance.user, attr, value)
            instance.user.save()

        return instance

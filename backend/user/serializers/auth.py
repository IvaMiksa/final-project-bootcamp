from django.contrib.auth import get_user_model
from rest_framework import serializers

from user.models import NomadProfile, HostProfile, RegistrationProfile
from user.validators import validate_password_strength

User = get_user_model()


class RegisterUserSerializer(serializers.Serializer):
    email = serializers.EmailField()


class RequestPasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError("User with this email does not exist")
        return value


class PasswordResetValidateSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password_reset_code = serializers.UUIDField()
    new_password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password_reset_code = data.get('password_reset_code')

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError({"email": "User does not exist."})

        if password_reset_code != user.password_reset_code:
            raise serializers.ValidationError({"code": "Invalid validation code."})

        new_password = data.get('new_password')
        validate_password_strength(new_password)

        data['user'] = user
        return data


class RegisterNomadSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=False)
    email = serializers.EmailField(required=True)
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)
    date_of_birth = serializers.DateField(required=False)
    country = serializers.CharField(required=False)
    phone_number = serializers.CharField(required=False)
    nationality = serializers.CharField(required=False)
    avatar = serializers.ImageField(required=False)
    passport_image = serializers.ImageField(required=False)
    code = serializers.UUIDField(required=True)
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = NomadProfile
        fields = [
            'id', 'proof_of_work', 'visa', 'about_me',
            'username', 'email', 'first_name', 'last_name',
            'date_of_birth', 'country', 'phone_number', 'nationality',
            'avatar', 'passport_image', 'password', 'code'
        ]
        extra_kwargs = {
            'password': {'write_only': True},
            'code': {'write_only': True}
        }

    def validate(self, attrs):
        code = attrs.get('code')
        email = attrs.get('email')

        registration_profile = RegistrationProfile.objects.filter(email=email).first()
        if not registration_profile or registration_profile.code != code:
            raise serializers.ValidationError({"code": "Invalid registration code."})

        new_password = attrs.get('password')
        validate_password_strength(new_password)

        return attrs

    def create(self, validated_data):
        validated_data.pop('code', None)
        proof_of_work = validated_data.pop('proof_of_work', None)
        visa = validated_data.pop('visa', None)
        about_me = validated_data.pop('about_me', '')

        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()

        nomad = NomadProfile.objects.create(
            user=user,
            proof_of_work=proof_of_work,
            visa=visa,
            about_me=about_me
        )

        registration_profile = RegistrationProfile.objects.filter(email=user.email).first()
        if registration_profile:
            registration_profile.user = user
            registration_profile.is_validated = True
            registration_profile.save()

        return nomad


class RegisterHostSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=False)
    email = serializers.EmailField(required=True)
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)
    date_of_birth = serializers.DateField(required=False)
    country = serializers.CharField(required=False)
    phone_number = serializers.CharField(required=False)
    nationality = serializers.CharField(required=False)
    avatar = serializers.ImageField(required=False)
    passport_image = serializers.ImageField(required=False)
    code = serializers.UUIDField(required=True)
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = HostProfile
        fields = [
            'id', 'proof_of_ownership',
            'username', 'email', 'first_name', 'last_name',
            'date_of_birth', 'country', 'phone_number', 'nationality',
            'avatar', 'passport_image', 'password', 'code'
        ]
        extra_kwargs = {
            'password': {'write_only': True},
            'code': {'write_only': True}
        }

    def validate(self, attrs):
        code = attrs.get('code')
        email = attrs.get('email')

        registration_profile = RegistrationProfile.objects.filter(email=email).first()
        if not registration_profile or registration_profile.code != code:
            raise serializers.ValidationError({"code": "Invalid registration code."})

        new_password = attrs.get('password')
        validate_password_strength(new_password)

        return attrs

    def create(self, validated_data):
        proof_of_ownership = validated_data.pop('proof_of_ownership', None)
        validated_data.pop('code', None)

        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()

        HostProfile.objects.create(
            user=user,
            proof_of_ownership=proof_of_ownership,
        )

        registration_profile = RegistrationProfile.objects.filter(email=user.email).first()
        if registration_profile:
            registration_profile.user = user
            registration_profile.is_validated = True
            registration_profile.save()

        return user

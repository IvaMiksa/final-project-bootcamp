from django.contrib.auth import get_user_model
from rest_framework import serializers

from booking.serializers import BookingSerializer
from property.models import Property, Review, Amenity, PropertyImage, Comment
from user.serializers.user import HostSerializer
from user.serializers.user import NomadSerializer

User = get_user_model()


class AmenitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Amenity
        fields = ['id', 'name', 'icon']


class ProperyImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage

        fields = ["id", "content"]


class CommentSerializer(serializers.ModelSerializer):
    review = serializers.PrimaryKeyRelatedField(queryset=Review.objects.all())

    class Meta:
        model = Comment
        fields = ["id", "content", "review"]


class ReviewSerializer(serializers.ModelSerializer):
    property = serializers.PrimaryKeyRelatedField(queryset=Property.objects.all())
    comment = CommentSerializer(read_only=True)
    created_by = NomadSerializer(read_only=True)

    class Meta:
        model = Review
        fields = ["id", "property", "created_by", "content", "rating", "comment"]


class PropertySerializer(serializers.ModelSerializer):
    host = HostSerializer(read_only=True)
    upload_images = serializers.ListField(
        child=serializers.ImageField(),
        write_only=True
    )
    bookings = BookingSerializer(many=True, read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)
    images = ProperyImagesSerializer(many=True, required=False)
    amenities = AmenitySerializer(many=True, read_only=True)
    amenities_ids = serializers.PrimaryKeyRelatedField(
        queryset=Amenity.objects.all(),
        many=True,
        write_only=True,
    )
    user_favourite = serializers.SerializerMethodField()

    class Meta:
        model = Property
        fields = "__all__"
        read_only_fields = ["verification",]

    def create(self, validated_data):
        amenities_data = validated_data.pop('amenities_ids', [])
        images = validated_data.pop('upload_images', [])
        request = self.context.get('request')
        user = request.user.host_profile

        property_instance = Property.objects.create(host=user, **validated_data)
        property_instance.amenities.set(amenities_data)

        for image in images:
            PropertyImage.objects.create(property=property_instance, content=image)

        return property_instance

    def update(self, instance, validated_data):
        amenities_data = validated_data.pop('amenities_ids', [])
        images = validated_data.pop('upload_images', [])

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        instance.amenities.set(amenities_data)
        if images:
            instance.images.all().delete()
            for image in images:
                PropertyImage.objects.create(property=instance, content=image)

        return instance

    def get_user_favourite(self, obj):
        if self.context:
            req = self.context['request']
            if req and req.user and hasattr(req.user, 'nomad_profile'):
                user = req.user.nomad_profile
                return user.favourite_properties.filter(pk=obj.id).exists()


class PropertyImageSerializer(serializers.ModelSerializer):
    property = PropertySerializer()

    class Meta:
        model = PropertyImage
        fields = "__all__"

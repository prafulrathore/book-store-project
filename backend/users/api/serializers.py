from rest_framework import serializers

from django.contrib.auth.models import User

from django.contrib.auth import login, authenticate
from django.utils.translation import gettext_lazy as _


# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email")


# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email", "password")
        extra_kwargs = {
            "password": {"write_only": True},
        }

        def create(self, validated_data):
            """
            Create and return a new user instance, given the validated data.
            """
            user = User.object.create(**validated_data)
            return user

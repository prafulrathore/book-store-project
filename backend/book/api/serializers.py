from cgitb import lookup
from django.contrib.auth.models import User

from rest_framework import serializers

from book.models import Book, Category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "category"]


class BookSerializer(serializers.ModelSerializer):
    author = serializers.SlugRelatedField(
        many=True, queryset=User.objects.all(), slug_field="username"
    )
    category = CategorySerializer()
    document = serializers.FileField(
        max_length=None,
        use_url=True,
    )
    pdf = serializers.FileField(
        max_length=None,
        use_url=True,
    )

    class Meta:
        model = Book
        fields = [
            "id",
            "title",
            "author",
            "document",
            "pdf",
            "category",
            "price",
        ]

    def validate_price(self, value):
        if value > 200:
            raise serializers.ValidationError("Price should be less than Rs.200 ")
        return value

    def create(self, validated_data):
        category_data = validated_data.pop("category")
        book = Book.objects.create(**validated_data)
        category = Category.objects.create(**category_data)
        book.category = category
        return book

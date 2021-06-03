from django.contrib.auth.models import User

from rest_framework import serializers

from users.api.serializers import UserSerializer
from book.models import Book


class BookSerializer(serializers.ModelSerializer):
    author = UserSerializer(many=True)

    class Meta:
        model = Book
        fields = [
            "id",
            "title",
            "author",
            "document",
            "price",
        ]

    def validate_price(self, value):
        if value > 200:
            raise serializers.ValidationError("Price should be less than Rs.200 ")
        return value

    # def validate(self, data):
    #     if not "book" in data["title"]:
    #         raise serializers.ValidationError("title should be related to book")
    #     return data

    # def create(self, validated_data):
    #     authors = validated_data.pop("author")
    #     book = Book.objects.create(**validated_data)

    #     for author in authors:
    #         author, created = User.objects.get_or_create(**authors)
    #         book.authors.add(author)
    #     return book

    # def update(self, instance, validated_data):
    #     instance.title = validated_data.get("title", instance.title)
    #     instance.author = validated_data.get("author", instance.author)
    #     instance.document = validated_data.get("document", instance.document)
    #     instance.price = validated_data.get("price", instance.price)
    #     instance.save()
    #     return instance

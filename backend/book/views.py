from django.shortcuts import render

from rest_framework.authentication import TokenAuthentication
from rest_framework import generics
from rest_framework.permissions import (
    AllowAny,
    IsAdminUser,
    IsAuthenticatedOrReadOnly,
    IsAuthenticated,
)

from book.models import Book
from book.api.serializers import BookSerializer


class BookCreateAPIView(generics.CreateAPIView):
    """
    POST : Create a new book.
    """

    # authentication_classes = (TokenAuthentication,)
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsAdminUser]


class BookDetail(generics.RetrieveAPIView):
    """
    Get : Get the list of book items.
    """

    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [AllowAny]


class BookUpdate(generics.UpdateAPIView):
    """
    PUT : Update a book.
    """

    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsAdminUser]


class BookDelete(generics.DestroyAPIView):
    """
    DELETE : Delete a book.
    """

    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticated]


class BookList(generics.ListAPIView):
    """
    GET : Get a list of all the books.
    """

    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [AllowAny]

from django.shortcuts import render

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.authentication import TokenAuthentication
from rest_framework import generics
from rest_framework.permissions import (
    AllowAny,
    IsAdminUser,
    IsAuthenticatedOrReadOnly,
    IsAuthenticated,
)
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status

from book.models import Book
from book.api.serializers import BookSerializer


# class BookCreateAPIView(generics.CreateAPIView):
#     """
#     POST : Create a new book.
#     """

#     authentication_classes = (TokenAuthentication,)
#     queryset = Book.objects.all()
#     serializer_class = BookSerializer
#     permission_classes = [IsAdminUser]


class BookCreateAPIView(APIView):
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        file_serializer = BookSerializer(data=request.data)
        if file_serializer.is_valid():
            file_serializer.save()
            return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BookDetail(generics.RetrieveAPIView):
    """
    Get : Get the list of book items.
    """

    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class BookUpdate(generics.UpdateAPIView):
    """
    PUT : Update a book.
    """

    authentication_class = TokenAuthentication
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsAdminUser]


class BookDelete(generics.DestroyAPIView):
    """
    DELETE : Delete a book.
    """

    authentication_class = TokenAuthentication
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsAdminUser]


class BookList(generics.ListAPIView):
    """
    GET : Get a list of all the books.
    """

    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["author"]


class SearchBook(generics.ListAPIView):
    """
    Get : Get a list of those book according to search parameter of the url
    """

    serializer_class = BookSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        title = self.kwargs["title"]
        return Book.objects.filter(title__icontains=title)
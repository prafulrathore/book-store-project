from django.contrib.auth.models import User

from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import filters

from users.api.serializers import (
    RegisterSerializer,
    UserSerializer,
)


# Create your views here.


class RegisterAPIView(generics.GenericAPIView):
    """
    POST : Create a User.
    """

    serializer_class = RegisterSerializer
    permission_classes = [
        AllowAny,
    ]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        content = {
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token.key,
        }
        return Response(content)


class LoginAPIView(ObtainAuthToken):
    """
    POST : Authenticate a user through username & password.
    """

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        token, created = Token.objects.get_or_create(user=user)
        return Response(
            {
                "token": token.key,
                "user_id": user.pk,
                "email": user.email,
                "username": user.username,
            }
        )


class UserListAPIView(generics.ListAPIView):
    """
    Get : Get a list of User.
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    # search by search fields
    filter_backends = [filters.SearchFilter]
    search_fields = ["username", "email", "book__title"]
    # search by ordering
    # filter_backends = [filters.OrderingFilter]
    # ordering_fields = ['username', 'email']

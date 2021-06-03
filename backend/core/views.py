from rest_framework.views import APIView
from rest_framework.response import Response


class IndexView(APIView):
    def get(self, request, format=None):

        content = {"message": "Welcome to bookstore"}

        return Response(content)
from django.contrib.auth.models import User
from rest_framework.response import Response

from rest_framework import viewsets

from accounts.serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def retrieve(self, request, *args, **kwargs):
        self.object = self.request.user
        serializer = self.get_serializer(self.object)
        return Response(serializer.data)

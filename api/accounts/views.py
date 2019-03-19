from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import action

from rest_framework import viewsets

from accounts.serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=False)
    def me(self, request):
        self.object = self.request.user
        serializer = self.get_serializer(self.object)
        return Response(serializer.data)

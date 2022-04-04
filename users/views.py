from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.permissions import IsAdminUser
from rest_framework.viewsets import GenericViewSet
from .models import User
from .serializers import UserModelSerializer, UserModelWithPermissionSerializer


class UserModelViewSet(ListModelMixin, RetrieveModelMixin,
                       UpdateModelMixin, GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer

    def get_serializer_class(self):
        if self.request.version == '2.0':
            return UserModelWithPermissionSerializer
        return UserModelSerializer

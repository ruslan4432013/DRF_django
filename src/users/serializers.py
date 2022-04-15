from rest_framework.serializers import HyperlinkedModelSerializer
from .models import User


class UserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'uid', 'username', 'first_name', 'last_name', 'birthday_date', 'email')


class UserModelWithPermissionSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'uid', 'username', 'first_name', 'last_name', 'birthday_date', 'email', 'is_staff', 'is_superuser')

from rest_framework import serializers
from users.serializers import UserModelSerializer
from .models import ToDo, Project


class ProjectSerializer(serializers.HyperlinkedModelSerializer):
    users = UserModelSerializer(many=True, required=False)

    class Meta:
        model = Project
        fields = ('url', 'uid', 'users', 'name', 'url_to_repo', 'owner')


class ToDoSerializer(serializers.ModelSerializer):
    project = serializers.StringRelatedField()
    user = serializers.StringRelatedField()
    class Meta:
        model = ToDo
        fields = '__all__'


class ToDoSerializerBase(serializers.ModelSerializer):
    class Meta:
        model = ToDo
        fields = '__all__'

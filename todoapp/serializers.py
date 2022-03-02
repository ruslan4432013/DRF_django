from rest_framework import serializers
from users.serializers import UserModelSerializer
from .models import ToDo, Project

class ProjectSerializer(serializers.HyperlinkedModelSerializer):
    users = UserModelSerializer(many=True, required=False)
    class Meta:
        model = Project
        fields = '__all__'


class ToDoSerializer(serializers.HyperlinkedModelSerializer):
    project = serializers.StringRelatedField()
    user = serializers.StringRelatedField()
    class Meta:
        model = ToDo
        exclude = ['created_at', 'updated_at']

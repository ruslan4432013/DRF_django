from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import DestroyAPIView
from .serializers import ToDoSerializer, ProjectSerializer
from .models import ToDo, Project
from rest_framework.pagination import LimitOffsetPagination
from .filters import ProjectFilter, ToDoFilter
from rest_framework import status
from rest_framework.response import Response
from rest_framework import mixins


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10

class ToDoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20

class ProjectViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    filter_class = ProjectFilter
    pagination_class = ProjectLimitOffsetPagination


class ToDoViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoSerializer
    pagination_class = ToDoLimitOffsetPagination
    filter_class = ToDoFilter


    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.active = False
        instance.save()
        return Response(ToDoSerializer(instance, context={'request': request}).data)

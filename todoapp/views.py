from rest_framework.viewsets import ModelViewSet
from .serializers import ToDoSerializer, ProjectSerializer
from .models import ToDo, Project

class ProjectViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class ToDoViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoSerializer

from django_filters import rest_framework as filters
from .models import Project, ToDo


class ProjectFilter(filters.FilterSet):
   name = filters.CharFilter(lookup_expr='contains')

   class Meta:
       model = Project
       fields = ['name']


class ToDoFilter(filters.FilterSet):
    created_at__gt = filters.DateFilter(field_name='created_at', lookup_expr='created_at__gt')
    created_at__lt = filters.DateFilter(field_name='created_at', lookup_expr='created_at__lt')
    class Meta:
        model = ToDo
        fields = ['project']


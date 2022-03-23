from rest_framework import permissions

from todoapp.models import Project, ToDo


class IsOwnerOrReadOnly(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        if isinstance(obj, Project):
            return obj.owner == request.user

        if isinstance(obj, ToDo):
            return obj.project.owner == request.user


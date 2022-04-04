from uuid import uuid4
from django.db import models
from users.models import User


class Project(models.Model):
    uid = models.UUIDField(primary_key=True, default=uuid4)
    name = models.CharField(verbose_name="Название проекта", max_length=255)
    url_to_repo = models.URLField(verbose_name="URL проекта", blank=True, null=True)
    users = models.ManyToManyField(to=User, verbose_name='Участники', related_name='projects', blank=True)
    owner = models.ForeignKey(to=User, verbose_name="Владелец проекта", on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class ToDo(models.Model):
    uid = models.UUIDField(primary_key=True, default=uuid4)
    project = models.ForeignKey(to=Project, verbose_name='Проект', on_delete=models.CASCADE)
    user = models.ForeignKey(to=User, verbose_name='Создатель заметки', on_delete=models.CASCADE)
    text = models.TextField(verbose_name='Текст заметки')
    active = models.BooleanField(verbose_name='Активна', default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)





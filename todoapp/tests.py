import json

from requests.auth import HTTPBasicAuth
from django.contrib.auth import get_user_model
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APITestCase
from mixer.backend.django import mixer
from .views import ProjectViewSet
from .models import Project, ToDo


class TestProjectViewSet(TestCase):
    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/projects/')
        view = ProjectViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post(path='/api/projects/',
                               data={"users": [],
                                     "name": "ruslan4432013",
                                     "urlToRepo": "http://googel.com/"},
                               format='json')
        view = ProjectViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        factory = APIRequestFactory()
        User = get_user_model()
        admin = User.objects.create_superuser('admin', 'admin@admin.ru', 'admin')
        request = factory.post(path='/api/projects/',
                               data={"name": "ruslan4432013",
                                     "url_to_repo": "http://googel.com/",
                                     "owner": f"http://127.0.0.1:8000/api/users/{admin.pk}/"},
                               format='json')

        force_authenticate(request, admin)
        view = ProjectViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_detail(self):
        User = get_user_model()
        admin = User.objects.create_superuser('admin', 'admin@admin.ru', 'admin')
        project = Project.objects.create(name='superproject',
                                         url_to_repo="http://googel.com/",
                                         owner=admin)
        client = APIClient()
        response = client.get(f'/api/projects/{project.uid}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_guest(self):
        User = get_user_model()
        admin = User.objects.create_superuser('admin', 'admin@admin.ru', 'admin')
        project = Project.objects.create(name='superproject',
                                         url_to_repo="http://googel.com/",
                                         owner=admin)
        client = APIClient()
        response = client.put(path=f'/api/projects/{project.uid}/',
                              data={"name": "ruslan4432013",
                                    "url_to_repo": "http://googel.com/",
                                    "owner": f"http://127.0.0.1:8000/api/users/{admin.pk}/"})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_admin(self):
        User = get_user_model()
        admin = User.objects.create_superuser('admin', 'admin@admin.ru', 'admin')
        project = Project.objects.create(name='superproject',
                                         url_to_repo="http://googel.com/",
                                         owner=admin)
        client = APIClient()
        client.login(username=admin, password=admin)

        response = client.put(path=f'/api/projects/{project.uid}/',
                              data={"name": "ruslan4432013",
                                    "url_to_repo": "http://googol.com/",
                                    "owner": f"http://127.0.0.1:8000/api/users/{admin.pk}/"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project = Project.objects.get(uid=project.uid)
        self.assertEqual(project.name, "ruslan4432013")
        self.assertEqual(project.url_to_repo, "http://googol.com/")
        client.logout()


class TestToDoViewSet(APITestCase):

    def test_get_list(self):
        response = self.client.get('/api/todo-list/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_admin(self):
        User = get_user_model()
        admin = User.objects.create_superuser('admin', 'admin@admin.ru', 'admin')
        notify = mixer.blend(ToDo)
        self.client.login(username='admin', password='admin')
        response = self.client.put(path=f'/api/todo-list/{notify.uid}/',
                                   data={'text': 'Edit todo',
                                         'project': notify.project.uid,
                                         'user': admin.uid})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        notify = ToDo.objects.get(uid=notify.uid)
        self.assertEqual(notify.text, 'Edit todo')

    def test_get_detail(self):
        notify = mixer.blend(ToDo, text='mixer todo')
        response = self.client.get(f'/api/todo-list/{notify.uid}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_notify = json.loads(response.content)
        self.assertEqual(response_notify['text'], 'mixer todo')

    def test_get_detail_project(self):
        notify = mixer.blend(ToDo, project__name='for mixer')
        response = self.client.get(f'/api/projects/{notify.project.uid}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_project = json.loads(response.content)
        self.assertEqual(response_project['name'], 'for mixer')




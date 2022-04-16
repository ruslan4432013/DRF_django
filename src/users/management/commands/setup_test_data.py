import random

from django.core.management.base import BaseCommand
from django.db import transaction

from users.factories import UserFactory, ProjectFactory, ToDoFactory
from users.models import User
from todoapp.models import ToDo, Project

NUM_USERS = 50
USERS_PER_CLUB = 4
NUM_PROJECT = 10


class Command(BaseCommand):
    help = 'Generated test data'

    @transaction.atomic
    def handle(self, *args, **kwargs):

        self.stdout.write("Deleting old data...")
        models = [User, ToDo, Project]
        for model in models:
            model.objects.all().delete()

        self.stdout.write("Creating new data...")
        people = []
        for _ in range(NUM_USERS):
            person = UserFactory()
            people.append(person)

        projects = []
        for _ in range(NUM_PROJECT):
            project = ProjectFactory(owner=random.choice(people))
            users = random.choices(people, k=USERS_PER_CLUB)
            project.users.add(*users)
            projects.append(project)

        todo_list = []
        for _ in range(4):
            user = random.choice(people)
            project = random.choice(projects)

            todo = ToDoFactory(user=user, project=project)
            todo_list.append(todo)

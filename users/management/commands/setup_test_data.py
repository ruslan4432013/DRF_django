import random

from django.db import transaction
from django.core.management.base import BaseCommand
from users.models import User
from users.factories import UserFactory

NUM_USERS = 50


class Command(BaseCommand):
    help = 'Generated test data'

    @transaction.atomic
    def handle(self, *args, **kwargs):
        self.stdout.write("Deleting old data...")
        models = [User]
        for model in models:
            model.objects.all().delete()

        self.stdout.write("Creating new data...")
        people = []
        for _ in range(NUM_USERS):
            person = UserFactory()
            people.append(person)

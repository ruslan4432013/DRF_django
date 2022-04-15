from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

class Command(BaseCommand):
    def handle(self, *args, **options):
        USERNAME = "admin"
        EMAIL = "dev@admin.ru"
        PASSWORD = "admin"

        User = get_user_model()
        if not User.objects.filter(username=USERNAME).first():
            User.objects.create_superuser(USERNAME, EMAIL, PASSWORD)
            self.stdout.write(f'Superuser "{USERNAME} was created"')
        else:
            self.stdout.write(f'Superuser "{USERNAME}" already exists')
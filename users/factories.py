import factory
from factory.django import DjangoModelFactory
from todoapp.models import ToDo, Project
from users.models import User


class UserFactory(DjangoModelFactory):
    class Meta:
        model = User

    username = factory.Faker('user_name')
    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')
    email = factory.Faker('email')
    birthday_date = factory.Faker('date_of_birth')


class ProjectFactory(DjangoModelFactory):
    class Meta:
        model = Project

    name = factory.Faker("sentence", nb_words=5, variable_nb_words=True)
    url_to_repo = factory.Faker('url')


class ToDoFactory(DjangoModelFactory):
    class Meta:
        model = ToDo

    uid = factory.Faker('uuid4')
    text = factory.Faker('sentence', nb_words=20, variable_nb_words=True)

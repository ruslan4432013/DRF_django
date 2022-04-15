import graphene
from graphene_django import DjangoObjectType
from todoapp.models import Project, ToDo
from users.models import User


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class NotificationType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'

class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'

class Query(graphene.ObjectType):
    projects = graphene.List(ProjectType)
    notifications = graphene.List(NotificationType)
    project_by_uid = graphene.Field(ProjectType, uid=graphene.String(required=True))
    notifications_by_user_name = graphene.List(NotificationType, name=graphene.String(required=False))
    users = graphene.List(UserType)

    def resolve_projects(root, info):
        return Project.objects.all()

    def resolve_notifications(root, info):
        return ToDo.objects.all()

    def resolve_project_by_uid(root, info, uid):
        try:
            return Project.objects.get(uid=uid)
        except Project.DoesNotExist:
            return None

    def resolve_users(root, info):
        return User.objects.all()

    def resolve_notifications_by_user_name(root, info, name=None):
        notifications = ToDo.objects.all()
        if name:
            notifications = ToDo.objects.filter(user__username=name)
        return notifications


class NotificationMutation(graphene.Mutation):
    class Arguments:
        text = graphene.String(required=True)
        uid = graphene.String()

    notification = graphene.Field(NotificationType)

    def mutate(root, info, text, uid):
        notification = ToDo.objects.get(pk=uid)
        notification.text = text
        notification.save()

        return NotificationMutation(notification=notification)


class Mutation(graphene.ObjectType):
    update_notification = NotificationMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)

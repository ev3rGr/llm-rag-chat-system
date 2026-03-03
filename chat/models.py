from django.db import models
from django.conf import settings

# Create your models here.
class Conversation(models.Model):

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    title = models.CharField("Title", max_length=255)
    created_at = models.DateTimeField("Created at", auto_now_add=True)
    updated_at = models.DateTimeField("Updated at", auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.title}"
    
class Message(models.Model):

    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE)

    role = models.CharField("Role", max_length=20)
    content = models.TextField("Content")

    def __str__(self):
        return f"{self.role} - Conv {self.conversation.id}"
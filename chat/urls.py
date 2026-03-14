from django.urls import path
from .views import ChatAPI, ChatView

urlpatterns = [
    path('', ChatView, name='chatview'),
    path('api/chat/', ChatAPI.as_view(), name='chatapi')
]
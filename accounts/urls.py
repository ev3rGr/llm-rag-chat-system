from django.urls import path
from .views import LoginView, RegisterView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('login/', LoginView, name="login"), 
    path('register/', RegisterView, name="register"),
]
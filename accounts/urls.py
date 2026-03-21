from django.urls import path
from .views import LoginView, RegisterAPI, RegisterView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('login/', LoginView, name="login"), 
    path('register/api/', RegisterAPI.as_view(), name="registerapi"),
    path('register/', RegisterView, name='registerapi'),
    path('api/token/', TokenObtainPairView.as_view(), name ='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name ='token_refresh')
]
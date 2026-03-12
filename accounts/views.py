from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView

# Create your views here.
def LoginView(request):
    return render(request, "login.html")

def RegisterView(request):
    return render(request, "register.html")
from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from .serializers import UserSerializers
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
def LoginView(request):
    return render(request, "login.html")

def RegisterView(request):
    return render(request, "register.html")

class RegisterAPI(APIView):

    def post(self, request):
        serializer = UserSerializers(data=request.data)
        
        if serializer.is_valid():
            serializer.save()

            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
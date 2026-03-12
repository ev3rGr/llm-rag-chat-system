from django.shortcuts import render, redirect
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed

def ChatView(request):
    jwt_auth = JWTAuthentication()

    try:
        user_auth_tuple = jwt_auth.authenticate(request)

        if user_auth_tuple is None:
            return redirect("/accounts/login")

        user, token = user_auth_tuple
        request.user = user

    except AuthenticationFailed:
        return redirect("/accounts/login")

    return render(request, "chat.html")
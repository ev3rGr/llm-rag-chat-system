from django.shortcuts import render, redirect

def ChatView(request):
    return render(request, "chat.html")
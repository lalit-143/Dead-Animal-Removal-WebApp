from django.shortcuts import render, redirect
from django.contrib import messages
from django.http import HttpResponse
from django.contrib.auth import  authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from .models import *


def home(request):
    return render(request, "home_user/index.html")

def signin(request):
    return render(request, 'login/index.html')

@csrf_exempt
def submit(request):
    if request.method == 'POST':

        image = request.FILES.get('image')
        location = request.POST.get('location')

        case_obj = case_obj(
            image = image,
            location = location, )
        case_obj.save()
        return redirect('home')

    return render(request, "home_user/index.html")


def language(request):
    return render(request, 'language/language.html')



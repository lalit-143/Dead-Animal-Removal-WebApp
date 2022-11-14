from django.shortcuts import render, redirect, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
from .models import Case

def home(request):
    return render(request, "index.html")

@csrf_exempt
def submit(request):
    if request.method == 'POST':

        image = request.FILES.get('image')
        location = request.POST.get('location')
        time = timezone.now()

        case_obj = Case(
            image = image,
            location = location,
            date = str(time),
        )
        case_obj.save()

        return redirect('home')

    return render(request, "index.html")

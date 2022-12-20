from django.shortcuts import render, redirect
from django.contrib import messages
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import  authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from .models import *
import random
import datetime
import json
from twilio.rest import Client
from django.contrib.auth.decorators import login_required
from cryptography.fernet import Fernet
from rest_framework.response import Response
global s_otp

# Credentials for sms servece...
account_sid = "AC771e05bdbffeea4b4dd8b848cbf1d1d3"
auth_token = "d4c18f1efe6c2164fb334bf61038403b"
client = Client(account_sid, auth_token)

# Select language page for user and worker..
def language(request):
    return render(request, 'language/language.html')

# Home view to redirect on perticular user type's page
@login_required(login_url='/language')
def home(request):
    myuser = request.user
    if myuser.user_type == '2':
        return redirect('home_worker')
    else:
        return redirect('home_user')
 
# Login page for user and worker   
def signin(request, lid):
    if request.user.is_authenticated:
        user = request.user
        user.language = lid
        user.save()
        return redirect('home')

    if lid == 3:
        return render(request, 'login/index.html')
    elif lid == 2:
        return render(request, 'login/index.html')
    else:
        return render(request, 'login/index.html')

# Send otp on entered number by user...
@csrf_exempt
def send_otp(request):
    if request.method == "POST":
        mobile_number = request.POST.get('mobile_num')
        otp = str(random.randint(1111, 9999))
        message = client.messages.create(
            body=f"{mobile_number} Want To Login In Your Animal's Heaven. There OTP is {otp}",
            from_="+19737914640",
            to="+919510242727"
        )

        request.session['my_otp'] = otp
        data = { 'success' : "OTP Send Success" } 
        return JsonResponse(data)

# Check Otp for auth
@csrf_exempt
def verify_otp(request):
    if request.method == "POST":
    
        mobile_number = request.POST.get('receive_num')
        r_otp = request.POST.get('receive_otp')

        s_otp = request.session.get('my_otp', '0000')

        if s_otp == r_otp:

            if CustomUser.objects.filter(username = mobile_number).exists():
                user = authenticate(username=mobile_number, password=mobile_number)
                login(request, user)
            else:
                user = CustomUser( username = mobile_number,)
                user.set_password(mobile_number)
                user.is_active = True
                user.save()
                user = authenticate(username=mobile_number, password=mobile_number)
                login(request, user)

            data = { 'valid' : "Login Success" } 
            return JsonResponse(data)
        else:
            data = { 'invalid' : "Invalid Otp" } 
            return JsonResponse(data)

    return render(request, 'login/index.html')

# Edit name or set name for user and worker...
@login_required(login_url='/language')
@csrf_exempt
def edit_name(request):

    if request.method == "POST":
        myuser = request.user
        user_name = request.POST.get('user_name')
        myuser.full_name = user_name
        myuser.save()
        return redirect('home')

'''================== User ==============='''

# Home page view for user
@login_required(login_url='/language')
def home_user(request):
    myuser = request.user
    myid = request.user.id
    mycase = Case.objects.filter(user_id = myid)
    data = {'cases':mycase}
    if myuser.language == '3':
        return render(request, "home_user/index_gu.html", data)
    elif myuser.language == '2':
        return render(request, "home_user/index_hi.html", data)
    else:
        return render(request, "home_user/index_en.html", data)


# Submit case...
@login_required(login_url='/language')
@csrf_exempt
def submit(request):
    if request.method == "POST":
        image = request.FILES.get('image')
        location = request.POST.get('location')
        description = request.POST.get('description')
        current_time = datetime.datetime.now()
        date = f"{current_time.day}-{current_time.month}-{current_time.year}"

        user = CustomUser.objects.get(id = request.user.id)
        worker = CustomUser.objects.get(id = 2)
        case_obj = Case(
            image = image,
            location = location,
            user_id = user,
            worker_id = worker,
            description = description,
            date = date, )
        user.total_case += 1
        user.pending_case += 1
        user.save() 
        case_obj.save()
        return redirect('home')
    return render(request, "home_user/index.html")

# add complaint to pending case...
@login_required(login_url='/language')
@csrf_exempt
def complaint(request):
    if request.method == "POST":

        case_id = request.POST.get('case_id')
        complaint = request.POST.get('complaint_box')
        print(case_id)
        print(complaint)
        current_time = datetime.datetime.now()
        date = f"{current_time.day}-{current_time.month}-{current_time.year}"

        case = Case.objects.get(id = case_id)

        comp_obj = Complaint(
            case_id = case,
            complaint_box = complaint,
            complaint_date = date, )

        comp_obj.save()
        return redirect('home')
    return render(request, "home_user/index.html")


'''================== Worker ==============='''


# Home Page view for worker
@login_required(login_url='/language')
def home_worker(request):
    myid = request.user.id
    mycase = Case.objects.filter(worker_id = myid)
    data = {'cases':mycase}
    return render(request, "home_worker/index.html", data)
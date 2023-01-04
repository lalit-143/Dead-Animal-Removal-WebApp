import random
import re
from .models import *
from django.shortcuts import render, redirect
from django.contrib import messages
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import  authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .auth import send_otp_to_phone
from time import gmtime, strftime
import simplejson as json
from math import radians, cos, sin, asin, sqrt

# Select language page for user and worker.
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

    request.session['my_lang'] = lid

    if lid == 3:
        return render(request, 'login/index.html')
    elif lid == 2:
        return render(request, 'login/index.html')
    else:
        return render(request, 'login/index.html')

# Send otp on entered number by user...
@csrf_exempt
@api_view(['POST'])
def send_otp(request):
    if request.method == "POST":
        mobile_number = request.POST.get('mobile_num')
        #otp = send_otp_to_phone(mobile_number)
        data = { 'success' : "OTP Send Success" }
        request.session['my_num'] = mobile_number
        request.session['my_otp'] = "1234"
        return JsonResponse(data)

# Check Otp for auth
@csrf_exempt
def verify_otp(request):
    if request.method == "POST":
    
        r_otp = request.POST.get('receive_otp')
        s_otp = request.session.get('my_otp', '0')
        mobile_number = request.session.get('my_num', '0')
        language_id = request.session.get('my_lang', '1')

        if s_otp == r_otp:

            if CustomUser.objects.filter(username = mobile_number).exists():
                myuser = CustomUser.objects.get(username = mobile_number)
                myuser.language = language_id
                myuser.save()
                user = authenticate(username=mobile_number, password=mobile_number)
                login(request, user)
            else:
                user = CustomUser( username = mobile_number,)
                user.set_password(mobile_number)
                if Worker.objects.filter(mobile_number = mobile_number).exists():
                    user.user_type = '2'
                user.is_active = True
                user.language = language_id
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


# Get User Device ID And Mobile Number From Android App
@csrf_exempt
def add_number(request, unum, udid):

    if Udid_Num.objects.filter(udid = udid).exists():
        device = Udid_Num.objects.get(udid = udid)
        device.unum = unum
        device.save()
        data = { 'success' : "Device ID Already Added (Number Updated)" }
        return JsonResponse(data)
    else:
        Add_Obj = Udid_Num( udid = udid, unum = unum,)
        Add_Obj.save()
        data = { 'success' : "Device ID Added With Number" }
        return JsonResponse(data)

@csrf_exempt
def check_number(request):

    if request.method == "POST":
        udid = request.POST.get('my_udid')
        if Udid_Num.objects.filter(udid = udid).exists():
            device = Udid_Num.objects.get(udid = udid)
            mobile_number = device.unum
            request.session['auto_num'] = mobile_number
            data = { 'success' : mobile_number }
            return JsonResponse(data)
        else:
            data = { 'error' : "Device ID Not Found" }
        return JsonResponse(data)


@csrf_exempt
def auto_login(request):
    if request.method == "POST":

        mobile_number = request.session.get('auto_num', '0')
        language_id = request.session.get('my_lang', '1')

        if mobile_number != '0':
            if CustomUser.objects.filter(username = mobile_number).exists():
                myuser = CustomUser.objects.get(username = mobile_number)
                myuser.language = language_id
                myuser.save()
                user = authenticate(username=mobile_number, password=mobile_number)
                login(request, user)
            else:
                user = CustomUser( username = mobile_number,)
                user.set_password(mobile_number)
                if Worker.objects.filter(mobile_number = mobile_number).exists():
                    user.user_type = '2'
                user.is_active = True
                user.language = language_id
                user.save()
                user = authenticate(username=mobile_number, password=mobile_number)
                login(request, user)
        data = { 'success' : "Login Success" }
        return JsonResponse(data)

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
        lng = request.POST.get('lng')
        lat = request.POST.get('lat')
        description = request.POST.get('description')
        date = strftime("%d-%m-%Y", gmtime())
        user = CustomUser.objects.get(id = request.user.id)
        nearest_worker_id = get_nearest_worker(lng, lat)
        worker = CustomUser.objects.get(id = nearest_worker_id)
        case_obj = Case(
            image = image,
            lng = lng,
            lat = lat,
            user_id = user,
            worker_id = worker,
            description = description,
            date = date,
            rejected_list = [0], )
        user.total_case += 1
        user.pending_case += 1
        user.save() 
        case_obj.save()
        data = { 'success' : "Case Submited" }
        return JsonResponse(data)

    return render(request, "home_user/index.html")

def get_nearest_worker(lng, lat):
    distance = 0
    workers = CustomUser.objects.filter(user_type = '2')
    fworker = workers[0]
    fdist = getdist(lat, fworker.latitude, lng, fworker.longitude)
    nworker = fworker.id

    for w in workers:
        distance = getdist(lat, w.latitude, lng, w.longitude)
        if distance < fdist:
            fdist = distance
            nworker = w.id

    return nworker


def getdist(lat1, lat2, lon1, lon2):
    lon1 = radians(float(lon1))
    lon2 = radians(float(lon2))
    lat1 = radians(float(lat1))
    lat2 = radians(float(lat2))
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
    c = 2 * asin(sqrt(a))
    r = 6371
    dist = c * r
    return dist
     

# add complaint to pending case...
@login_required(login_url='/language')
@csrf_exempt
def complaint(request):
    if request.method == "POST":

        case_id = request.POST.get('case_id')
        complaint = request.POST.get('complaint_box')
        date = strftime("%d-%m-%Y", gmtime())

        case = Case.objects.get(id = case_id)
        worker = case.worker_id

        comp_obj = Complaint(
            case_id = case,
            complaint_box = complaint,
            worker_id = worker,
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
    mycomplaint = Complaint.objects.filter(worker_id = myid).order_by('-id')
    accepted_case = Case.objects.filter(worker_id = myid, accept=1)
    data = {'cases':mycase, 'complaints':mycomplaint, 'scases':accepted_case}
    return render(request, "home_worker/index.html", data)


# Edit Location or set Location for worker...
@login_required(login_url='/language')
@csrf_exempt
def add_location(request):

    if request.method == "POST":
        myuser = request.user
        latitude = request.POST.get('lat')
        longitude = request.POST.get('lng')
        myuser.latitude = latitude
        myuser.longitude = longitude
        myuser.save()
        data = { 'success' : "location added" }
        return JsonResponse(data)


@login_required(login_url='/language')
@csrf_exempt
def case_accept(request):

    if request.method == "POST":
        cid = request.POST.get('case_id')
        case = Case.objects.get(id = cid)
        case.accept = 1
        case.save()
        data = { 'msg' : "case accepted" }
        return JsonResponse(data)



@login_required(login_url='/language')
@csrf_exempt
def case_near(request):

    if request.method == "POST":
        myid = request.user.id
        lng = request.POST.get('lng')
        lat = request.POST.get('lat')
        ncase_id = get_nearest_case(lng, lat, myid)
        if ncase_id == 0:
            data = { 'msg' : "There Are No Accepted Case..." }
            return JsonResponse(data)
        ncase = Case.objects.get(id = ncase_id)
        ncase_date = ncase.date
        data = { 'id' : ncase_id, 'date':ncase_date }
        return JsonResponse(data)

def get_nearest_case(lng, lat, myid):
    distance = 0
    accepted_cases = Case.objects.filter(worker_id = myid, accept=1).count()
    if accepted_cases == 0:
        return 0
    accepted_cases = Case.objects.filter(worker_id = myid, accept=1)
    fcase = accepted_cases[0]
    fdist = getdist(lat, fcase.lat, lng, fcase.lng)
    ncase = fcase.id

    for c in accepted_cases:
        distance = getdist(lat, c.lat, lng, c.lng)
        if distance < fdist:
            fdist = distance
            ncase = c.id

    return ncase

# Submit case...
@login_required(login_url='/language')
@csrf_exempt
def worker_submit(request):
    if request.method == "POST":
        user = request.user
        case_id = int(request.POST.get('cid'))
        image = request.FILES.get('image')
        date = strftime("%d-%m-%Y", gmtime())
        case = Case.objects.get(id = case_id)
        case.image = image
        case.date = date
        case.status = "Solved"
        case.accept = 0
        user.pending_case -= 1
        user.solved_case += 1
        user.save()
        case.save()
        data = { 'success' : "Case Submited" }
        return JsonResponse(data)

    return render(request, "home_user/index.html")



@login_required(login_url='/language')
@csrf_exempt
def reject_case(request):
    if request.method == "POST":
        myid = request.user.id
        case_id = int(request.POST.get('cid'))
        case = Case.objects.get(id = case_id)
        lat = case.lat
        lng = case.lng
        rejected_list = case.rejected_list
        rejected_list.append(myid)
        case.rejected_list = rejected_list
        case.save()
        new_worker_id = rejected_case_worker(lng, lat, case_id)
        new_worker = CustomUser.objects.get(id = new_worker_id)
        case.worker_id = new_worker
        case.accept = 0
        case.save()
        data = { 'msg' : "Case Rejected" }
        return JsonResponse(data)

    return render(request, "home_user/index.html")


def rejected_case_worker(lng, lat, case_id):
    distance = 0
    case = Case.objects.get(id = case_id)
    rejected_list = case.rejected_list
    workers = CustomUser.objects.filter(user_type = '2')
    fworker = workers[0]
    fdist = getdist(lat, fworker.latitude, lng, fworker.longitude)
    nworker = fworker.id

    for w in workers:
        distance = getdist(lat, w.latitude, lng, w.longitude)
        if distance < fdist and (w.id not in rejected_list):
            fdist = distance
            nworker = w.id
    return nworker



'''================== Admin ==============='''


@login_required(login_url='/language')
@csrf_exempt
def add_worker(request):
    if request.method == "POST":
        mobile_num = request.POST.get('mobile_number')
        if Worker.objects.filter(mobile_number = mobile_num).exists():
            worker = CustomUser.objects.get(username = mobile_num)
            worker.user_type = '2'
            data = { 'msg' : "Worker Added" }
        else:
            worker = Worker( mobile_number = mobile_num, )
            data = { 'msg' : "Worker Created" }
        worker.save()
        return JsonResponse(data)

    return render(request, "home_user/index.html")
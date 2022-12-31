from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(CustomUser)
admin.site.register(Case)
admin.site.register(Complaint)
admin.site.register(Udid_Num)
admin.site.register(Worker)
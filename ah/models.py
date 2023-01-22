from django.db import models
from django.contrib.auth.models import AbstractUser
from datetime import datetime
from django_mysql.models import ListTextField
from django.db.models import IntegerField, Model

# Create your models here.

class CustomUser(AbstractUser):
	
	typeuser = (
		('3','Admin'),
		('2','Worker'),
		('1','User'),
	)

	typelanguage = (
		('3','Gujarati'),
		('2','Hindi'),
		('1','English'),
	)

	user_type = models.CharField(choices=typeuser, max_length=10, default=1)
	language = models.CharField(choices=typelanguage, max_length=10, default=1)
	full_name = models.CharField(max_length=100, default="")
	total_case = models.IntegerField(default=0)
	pending_case = models.IntegerField(default=0)
	solved_case = models.IntegerField(default=0)
	latitude = models.CharField(max_length=100, default="0")	
	longitude = models.CharField(max_length=100, default="0")

	def __str__(self):

		return self.full_name + " ( " + "ID - " + str(self.id) + " ) "


class Case(models.Model):

	typestatus = (
		('Solved','Solved'),
		('Pending','Pending'),
	)

	user_id = models.ForeignKey(CustomUser, related_name = 'user_id', on_delete=models.CASCADE)
	image = models.ImageField(upload_to = 'img')
	lng = models.CharField(max_length=100, default=None)
	lat = models.CharField(max_length=100, default=None)
	date = models.CharField(max_length=100, default="DD-MM-YYYY")
	status = models.CharField(choices=typestatus, max_length=10, default='Pending')
	description = models.TextField(default=None)
	worker_id = models.ForeignKey(CustomUser, related_name = 'worker_id', on_delete=models.DO_NOTHING)
	accept = models.IntegerField(default=0)
	rejected_list = ListTextField(base_field=IntegerField(), size=100,)
	rating = models.CharField(max_length=50, default='0')

	def __str__(self):

		dt = self.date
		sts = self.status
		cid = str(self.id)
		return dt + " [ " + sts + " ] " + " ( " + " ID - " + cid + " ) "


class Complaint(models.Model):
	worker_id = models.ForeignKey(CustomUser, related_name='case_worker_id', on_delete=models.CASCADE)
	user_id = models.ForeignKey(CustomUser, related_name='case_user_id', on_delete=models.CASCADE)
	case_id = models.ForeignKey(Case, related_name='case_id', on_delete=models.CASCADE)
	complaint_date = models.CharField(max_length=100, default="DD-MM-YYYY")
	complaint_box = models.TextField(default=None)

	def __str__(self):

		dt = self.complaint_date
		sts = self.case_id.status
		return dt + " ( " + sts + " ) "


class Udid_Num(models.Model):
	udid = models.CharField(max_length=100, default="None")
	unum = models.CharField(max_length=100, default="None")

	def __str__(self):
		return self.udid + " - " + self.unum



class Worker(models.Model):
	mobile_number = models.CharField(max_length=100, default="None")

	def __str__(self):
		return self.mobile_number


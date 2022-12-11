from django.db import models
from django.contrib.auth.models import AbstractUser

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
	full_name = models.CharField(max_length=100, default="User")
	total_case = models.IntegerField(default=0)
	pending_case = models.IntegerField(default=0)
	solved_case = models.IntegerField(default=0)


class Case(models.Model):

	typestatus = (
		('2','Solved'),
		('1','Pending'),
	)

	user_id = models.ForeignKey(CustomUser, on_delete=models.DO_NOTHING)
	image = models.ImageField(upload_to = 'img')
	location = models.CharField(max_length=500, default=None)
	date = models.DateTimeField(auto_now_add=True)
	status = models.CharField(choices=typestatus, max_length=10, default=1)
	description = models.TextField(default=None)


	def __str__(self):
		idstr = str(self.id)
		return idstr + " -- " + status 
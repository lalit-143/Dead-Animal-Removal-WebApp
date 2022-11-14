from django.db import models

# Create your models here.

class Case(models.Model):
	image = models.ImageField(upload_to = 'img')
	location = models.CharField(max_length=500)
	date = models.CharField(max_length=50)

	def __str__(self):
		idstr = str(self.id)
		return idstr
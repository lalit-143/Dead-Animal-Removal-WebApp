from django.urls import path
from ah import views

urlpatterns = [
	path('', views.home, name="home"),
	path('submit', views.submit, name="submit"),
]
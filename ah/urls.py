from django.urls import path
from ah import views

urlpatterns = [
	path('', views.home, name="home"),
	path('signin', views.signin, name="signin"),
	path('submit', views.submit, name="submit"),
	path('language', views.language, name="language"),

]

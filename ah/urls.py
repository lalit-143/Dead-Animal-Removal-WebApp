from django.urls import path
from ah import views

urlpatterns = [
	
	# =============== User / Worker =================

	# for landing page...
	path('', views.home, name="home"),

	# for select language...
	path('language', views.language, name="language"),

	# for authentication...
	path('signin/<str:lid>', views.signin, name="signin"),
	path('sendotp', views.send_otp, name="sendotp"),
	path('verifyotp', views.verify_otp, name="verifyotp"),

	# for edit or set name...
	path('editname', views.edit_name, name="editname"),

	# =================== User =======================

	# Store User Id With Mobile Number...
	path('add', views.add, name="add"),

	# for homepage
	path('user', views.home_user, name="home_user"),

	# for submit case...
	path('submit', views.submit, name="submit"),

	# for add complaint...
	path('complaint', views.complaint, name="complaint"),

	# ================== Worker ======================

	# for homepage
	path('worker', views.home_worker, name="home_worker"),

	# for Add Location of worker
	path('addlocation', views.add_location, name="add_location"),

	path('caseaccept', views.case_accept, name="case_accept"),

	path('casenear', views.case_near, name="case_near"),

	path('worker/submit', views.worker_submit, name="worker_submit"),
]

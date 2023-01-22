from django.urls import path
from ah import views

urlpatterns = [
	
	# =============== User / Worker =================

	# for landing page...
	path('', views.home, name="home"),

	# for select language...
	path('language', views.language, name="language"),

	# for authentication...
	path('signin/<str:lid>/<str:myid>', views.signin, name="signin"),
	path('sendotp', views.send_otp, name="sendotp"),
	path('verifyotp', views.verify_otp, name="verifyotp"),

	# for edit or set name...
	path('editname', views.edit_name, name="editname"),


	# Store User Id With Mobile Number...
	path('add/<str:unum>/<str:udid>', views.add_number, name="add_number"),

	path('checknumber', views.check_number, name="check_number"),

	path('autologin', views.auto_login, name="auto_login"),

	# =================== User =======================

	# for homepage
	path('user', views.home_user, name="home_user"),

	# for submit case...
	path('submit', views.submit, name="submit"),

	# for add complaint...
	path('complaint', views.complaint, name="complaint"),

	path('addrating', views.add_rating, name="add_rating"),

	# ================== Worker ======================

	# for homepage
	path('worker', views.home_worker, name="home_worker"),

	# for Add Location of worker
	path('addlocation', views.add_location, name="add_location"),

	path('caseaccept', views.case_accept, name="case_accept"),

	path('casenear', views.case_near, name="case_near"),

	path('worker/submit', views.worker_submit, name="worker_submit"),

	path('worker/rejectcase', views.reject_case, name="reject_case"),


	# ================== Admin ======================

	path('myadmin', views.home_myadmin, name="home_myadmin"),

	path('myadmin/login', views.login_myadmin, name="login_myadmin"),

	path('myadmin/complaint', views.complaint_myadmin, name="complaint_myadmin"),

	path('myadmin/worker/view', views.view_worker_myadmin, name="view_worker_myadmin"),

	path('myadmin/worker/add', views.add_worker_myadmin, name="add_worker_myadmin"),
	
	path('myadmin/worker/delete/<str:wnid>', views.delete_worker_myadmin, name="delete_worker_myadmin"),

	path('myadmin/user/view', views.view_user_myadmin, name="view_user_myadmin"),

	path('myadmin/case/pending', views.pending_case_myadmin, name="pending_case_myadmin"),

	path('myadmin/case/solved', views.solved_case_myadmin, name="solved_case_myadmin"),

	path('myadmin/logout', views.logout_myadmin, name="logout_myadmin"),

	path('myadmin/addworker', views.add_worker, name="add_worker"),


]

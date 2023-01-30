from functools import wraps
from django.contrib import messages
from django.shortcuts import redirect
from django.http import HttpResponse
  
  
def user_test_function(user):
    if user.user_type == '1':
        return True
    return False
  
  
def worker_test_function(user):
    if user.user_type == '2':
        return True
    return False
  
  
def admin_test_function(user):
    if user.user_type == '3':
        return True
    return False
  
  
def user_only(view_to_return="home"):
    def decorator(view):
        @wraps(view)
        def _wrapped_view(request, *args, **kwargs):
            if not user_test_function(request.user):
                return redirect(view_to_return)
            return view(request, *args, **kwargs)
        return _wrapped_view
    return decorator
  
  
def worker_only(view_to_return="home"):
    def decorator(view):
        @wraps(view)
        def _wrapped_view(request, *args, **kwargs):
            if not worker_test_function(request.user):
                return redirect(view_to_return)
            return view(request, *args, **kwargs)
        return _wrapped_view
    return decorator
  
def admin_only(view_to_return="login_myadmin"):
    def decorator(view):
        @wraps(view)
        def _wrapped_view(request, *args, **kwargs):
            if not admin_test_function(request.user):
                return redirect(view_to_return)
            return view(request, *args, **kwargs)
        return _wrapped_view
    return decorator
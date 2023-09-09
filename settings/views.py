from django.shortcuts import render
from django.views import View

class CustomLoginView(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'login.html')

class CustomResetPasswordView(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'reset_password.html')    

class CustomUserSignUpView(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'signup.html')    

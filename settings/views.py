from django.shortcuts import render, redirect
from django.views import View
from django.contrib.auth import authenticate, login

class CustomLoginView(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'login.html')

    def post(self, request, *args, **kwargs):
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            print("Autenticação bem-sucedida")  # Adicione esta linha para depuração
            return redirect('main_page') 
        else:
            print("Autenticação falhou")  # Adicione esta linha para depuração
            return render(request, 'login.html', {'error_message': 'Credenciais inválidas'})

class MainPageView(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'main_page.html')

class CustomResetPasswordView(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'reset_password.html')    

class CustomUserSignUpView(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'signup.html')    

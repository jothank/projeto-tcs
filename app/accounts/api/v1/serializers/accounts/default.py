"""
API V1: Accounts Serializers
"""
###
# Libraries
###
from dj_rest_auth.serializers import PasswordResetSerializer
from app.accounts.forms import CustomResetPasswordForm, CustomRegisterForm
from django.contrib.auth.models import User
from rest_framework import serializers


###
# Serializers
###
class CustomPasswordResetSerializer(PasswordResetSerializer):
    password_reset_form_class = CustomResetPasswordForm

    def get_email_options(self):
        return {
            'subject_template_name': 'account/reset/password_reset_subject.txt',
            'email_template_name': 'account/reset/password_reset_message.txt',
            'html_email_template_name': 'account/reset/password_reset_message.html',
        }
        
class CustomRegisterSerializer(serializers.Serializer):
    register_user_form_class = CustomRegisterForm
    
    def get_email_options(self):
        return {
            'subject_template_name': 'accounts/registration_subject.txt',
            'email_template_name': 'accounts/registration_message.txt',
            'html_email_template_name': 'accounts/registration_message.html',
        }
    

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
        extra_kwargs = {'password':{'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
"""
API V1: Product Registration Views
"""
###
# Libraries
###
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Product, ProductRegistration
from .serializers import ProductSerializer, ProductRegistrationSerializer
from rest_framework import viewsets
from app.product_registration.models.product_registration import ProductRegistration
from app.product_registration.api.v1.serializers.product_registration.default_serializer import ProductRegistrationSerializer

###
# Viewsets
###

class ProductRegistrationViewSet(viewsets.ModelViewSet):
    queryset = ProductRegistration.objects.all()
    serializer_class = ProductRegistrationSerializer



# class ProductRegistrationView(APIView):
#     def post(self, request, format=None):
#         product_data = request.data.get('product') 
#         registration_data = request.data.get('registration')  

        
#         product_serializer = ProductSerializer(data=product_data)
#         if product_serializer.is_valid():
#             product_serializer.save()

        
#         registration_data['product'] = product_serializer.data.get('id')
#         registration_serializer = ProductRegistrationSerializer(data=registration_data)
#         if registration_serializer.is_valid():
#             registration_serializer.save()

#         return Response(status=status.HTTP_201_CREATED)

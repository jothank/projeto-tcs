from django.urls import path, include

urlpatterns = [
    path('', include('app.feedstock.api.v1.urls')),
]
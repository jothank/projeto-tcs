from django.urls import path, include

urlpatterns = [
    path('', include('app.utils.api.v1.urls')),
]
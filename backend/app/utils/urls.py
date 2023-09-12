from django.urls import path, include

urlpatterns = [
    path('api/v1/', include('app.utils.api.v1.urls')),
]
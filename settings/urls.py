from django.contrib import admin
from django.urls import path, include
from .views import CustomLoginView, CustomResetPasswordView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('app.accounts.urls')),
    path('', CustomLoginView.as_view(), name='custom_login'), 
    path('reset_password/', CustomResetPasswordView.as_view(), name='reset_password'),
    path('api/', include('app.accounts.urls')),
    # path('', include('app.feedstock.urls')),
    path('', include('app.fixed_expense.urls')),
    path('', include('app.resale_item.urls')),
    path('', include('app.product.urls')),
    path('', include('app.product_registration.urls')),
]

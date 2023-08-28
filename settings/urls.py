from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('app.accounts.urls')),
    path('', include('app.feedstock.urls')),
    path('', include('app.fixed_expense.urls')),
    path('', include('app.resale_item.urls')),
    path('', include('app.product.urls')),
    path('', include('app.product_registration.urls')),
    path('', include('app.company.urls')),
]

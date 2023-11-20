"""
Root URL Configuration
"""
###
# Libs
###
from django.contrib import admin
from django.urls import path, include
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions


###
# Swagger
###

schema_view = get_schema_view(
    openapi.Info(
        title="GastroCustos API",
        default_version='v1',
        description="Bem-vindo à **GastroCustos API**, sua solução para o gerenciamento eficiente de custos no setor de gastronomia. \n\n## Documentação\n\nExplore nossa documentação interativa usando as seguintes ferramentas:\n\n- [Swagger UI](/swagger/): Uma interface interativa para explorar e testar os endpoints da API.\n- [ReDoc](/redoc/): Uma documentação de API interativa e responsiva.\n\nPara obter mais informações ou entrar em contato conosco, envie um email para [gastrocustos@gmail.com](mailto:gastrocustos@gmail.com).\n\nAproveite nossa API e comece a simplificar a gestão de custos hoje mesmo!",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)


###
# URL Patterns
###


urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('app.accounts.urls')),
    path('', include('app.combo.urls')),
    path('', include('app.cost.urls')),
    path('', include('app.feedstock.urls')),
    path('', include('app.fixed_expense.urls')),
    path('', include('app.pricing.urls')),
    path('', include('app.product.urls')),
    path('', include('app.production_simulator.urls')),
    path('', include('app.supply.urls')),


    # Swagger
    path('swagger<format>/', schema_view.without_ui(cache_timeout=0),
         name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger',
         cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc',
         cache_timeout=0), name='schema-redoc'),
]

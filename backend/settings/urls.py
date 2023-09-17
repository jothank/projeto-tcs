from django.contrib import admin
from django.urls import path, include
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions


schema_view = get_schema_view(
    openapi.Info(
        title="GastroCustos API",
        default_version='v1',
        description="# GastroCustos API\n\nBem-vindo à **GastroCustos API**, sua solução para o gerenciamento eficiente de custos no setor de gastronomia. Nossa API oferece uma variedade de recursos para ajudar você a controlar suas despesas, acompanhar suas receitas e otimizar seus processos de negócios.\n\nCom a GastroCustos API, você pode:\n\n- Acessar facilmente informações sobre contas, administradores e muito mais.\n- Personalizar suas configurações para atender às suas necessidades específicas.\n- Simplificar a gestão de custos e melhorar a eficiência de sua operação.\n\n## Documentação\n\nExplore nossa documentação interativa usando as seguintes ferramentas:\n\n- [Swagger UI](/swagger/): Uma interface interativa para explorar e testar os endpoints da API.\n- [ReDoc](/redoc/): Uma documentação de API interativa e responsiva.\n\nPara obter mais informações ou entrar em contato conosco, envie um email para [gastrocustos@gmail.com](mailto:gastrocustos@gmail.com).\n\nAproveite nossa API e comece a simplificar a gestão de custos hoje mesmo!",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="gastrocustos@gmail.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('app.accounts.urls')),
    path('', include('app.combo.urls')),
    path('', include('app.company.urls')),
    path('', include('app.feedstock.urls')),
    path('', include('app.fixed_expense.urls')),
    path('', include('app.pricing.urls')),
    path('', include('app.product.urls')),
    path('', include('app.product_registration.urls')),
    path('', include('app.resale_item.urls')),
    path('', include('app.utils.urls')),
    path('', include('app.variable_expense.urls')),
    path('swagger<format>/', schema_view.without_ui(cache_timeout=0),
         name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger',
         cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc',
         cache_timeout=0), name='schema-redoc'),
]

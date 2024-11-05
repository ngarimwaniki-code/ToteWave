from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import RedirectView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework.permissions import AllowAny  # Adjust this as necessary
from rest_framework_simplejwt.authentication import JWTAuthentication

# Create the schema view
schema_view = get_schema_view(
    openapi.Info(
        title="ToteWave API",
        default_version='v1',
        description="API documentation for the ToteWave, allowing users to manage and purchase tote bags.",
        terms_of_service="https://www.totewave.com/terms/",  
        contact=openapi.Contact(email="support@totewave.com"),  
        license=openapi.License(name="BSD License"),  
    ),
    public=True,
    authentication_classes=(JWTAuthentication,),
    permission_classes=(AllowAny,)
)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/products/', include('apps.products.urls')),
    path('api/orders/', include('apps.orders.urls')),
    path('api/users/', include('apps.users.urls')),
    
    # Redirect to the API documentation
    path('', RedirectView.as_view(url='/swagger/')),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

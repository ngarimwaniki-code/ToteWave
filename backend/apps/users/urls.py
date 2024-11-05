from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet

router = DefaultRouter()
router.register('', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('verify-email/<str:token>/', UserViewSet.as_view({'get': 'verify_email'}), name='verify-email'),
]

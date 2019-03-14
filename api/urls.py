# truckfinder URL Configuration

from django.conf.urls import url, include
from django.contrib import admin

from rest_framework import routers
from rest_framework.authtoken import views as auth_views

from accounts.views import UserViewSet
from gifs.views import FetchViewSet, GifViewSet

router = routers.DefaultRouter()
router.register(r"users", UserViewSet)
router.register(r"fetch", FetchViewSet, base_name="fetch")
router.register(r"gifs", GifViewSet)
urlpatterns = [
    url(r"^api/", include(router.urls)),
    url(r"^me/", UserViewSet.as_view({"get": "retrieve"})),
    url(r"^admin/", admin.site.urls),
    url(r"^api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    url(r"^api-token-auth/", auth_views.obtain_auth_token),
]

from django.urls import path
from django.urls import path, include
from django.conf import settings
from debug_toolbar.toolbar import debug_toolbar_urls

from . import views

app_name = 'home'

urlpatterns = [
    path('', views.index, name='index'), #type: ignore
]
    
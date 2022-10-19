from django.urls import path
from . import views

urlpatterns = [
    path('', views.gallery, name='gallery'),
    path('ajax/<pk>/<str:whichImg>/', views.ajax_gallery_data, name='ajax_gallery'),
]
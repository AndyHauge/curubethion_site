from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('<str:name>/', views.LinkListView.as_view(), name='category-list-view'),
]
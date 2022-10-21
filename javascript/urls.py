from django.urls import path
from . import views

urlpatterns = [
    path('', views.jsmain, name='js-landing'),
    path('business-card/', views.businesscard, name='business-card'),
    path('notes-app', views.notesapp, name='notes-app'),
]
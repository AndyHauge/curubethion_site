from django.contrib import admin

# Register your models here.

from .models import Link, Category

admin.site.register(Link)
admin.site.register(Category)
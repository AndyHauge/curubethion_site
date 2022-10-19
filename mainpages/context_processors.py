# Used in navbar (provides Category queryset to loop through)
from .models import Category

def categories(request):
    return {'categories': Category.objects.all()} # Could change all() to filter(live=True) in the future
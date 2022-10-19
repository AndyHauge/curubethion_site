from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.views import generic
from .models import Category, Link

# Create your views here.

def index(request):
    return render(request, 'index.html')

class LinkListView(generic.ListView):
    
    template_name = 'mainpages/link_list.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        self.category = get_object_or_404(Category, slug_name=self.kwargs['name'])
        context['category_name'] = self.category.display_name
        context['category_description'] = self.category.description
        return context

    def get_queryset(self):
        self.category = get_object_or_404(Category, slug_name=self.kwargs['name'])
        return Link.objects.filter(link_category=self.category)
from django.shortcuts import render
from django.http import JsonResponse
from .models import Image

# Create your views here.

def gallery(request):
    imgCount = Image.objects.filter(production_ready=True).count()
    return render(request, 'gallery.html')

def ajax_gallery_data(request,pk,whichImg): # View to handle Gallery queries
    if request.headers.get('x-requested-with') == 'XMLHttpRequest': # prevents direct URL access
        match whichImg:
            case 'prev':
                if Image.objects.get(pk=pk).get_previous_by_date_created():
                    record = Image.objects.get(pk=pk).get_previous_by_date_created()
                else:
                    record = Image.objects.get(pk=pk)
            case 'next':
                if Image.objects.get(pk=pk).get_next_by_date_created():
                    record = Image.objects.get(pk=pk).get_next_by_date_created()
                else:
                    record = Image.objects.get(pk=pk)
            case 'first':
                record = Image.objects.first()
        data = {
            'imgId': record.id,
            'imgName': record.title,
            'imgDesc': record.description,
            'imgURL': record.img_url,
            #TODO pass tags as imgTags, and use them in the JS to build a tag cloud
        }
        return JsonResponse(data)
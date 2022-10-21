from django.shortcuts import render

# Create your views here.

def jsmain(request):
    return render(request, 'javascript.html')

def businesscard(request):
    return render(request, 'javascript/business-card.html')

def notesapp(request):
    return render(request, 'javascript/notes-app.html')
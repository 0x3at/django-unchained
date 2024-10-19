from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.contrib.sessions.models import Session

# Create your views here.

DEBUG_STARTUP = False

def index(request):
    context = {
        'page_title': 'Winduhs 7',
        'page_description': 'Welcome, Human.',
        'load_startup': False,  
    }
    if not request.session.session_key or request.session.get('first_time', True) or DEBUG_STARTUP:
        # Set load_startup to True if there's no session or it's the first time
        context['load_startup'] = True
        
        # Set the first_time session flag
        request.session['first_time'] = False  # This will track that the user has connected before

    # Save the session to ensure the updated data persists
    request.session.save()

    template = loader.get_template("home/base.html")
    return HttpResponse(template.render(context, request))



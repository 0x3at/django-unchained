from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
# Create your views here.

def index(request):

    context = {
        'page_title': 'Home',
        'page_description': 'Welcome, Human.'
    }

    template = loader.get_template("home/base.html")
    return HttpResponse(template.render(context, request))



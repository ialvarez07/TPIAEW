import requests
import json
from zeep import Client
from zeep.cache import SqliteCache
from zeep.transports import Transport
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.conf import settings
from django.contrib.auth import login, logout
from django.contrib.auth.models import User


transport = Transport(cache=SqliteCache())
soap = Client(settings.URL_WSDL, transport=transport)


def oauth_callback(request):
    code = request.GET.get('code', None)
    scope = request.GET.get('scope', None)
    error = request.GET.get('error', None)
    if code and scope:
        # Ahora tengo que solicitar el access token con el code obtenido
        datos = {
            'grant_type': 'authorization_code',
            'redirect_uri': settings.REDIRECT_URI,
            'client_id': settings.CLIENT_ID,
            'client_secret': settings.CLIENT_SECRET,
            'code': code
        }
        response = requests.post(settings.URL_ACCESS_TOKEN, datos)
        if response.content:
            try:
                dic = response.json()
                if dic['access_token'] and dic['scope'] == 'read':
                    usuario_tmp, creado = User.objects.get_or_create(username=dic['access_token'])
                    login(request, usuario_tmp)
                    return HttpResponseRedirect(reverse('turicor:index_tmpl'))
            except Exception as exc:
                print(exc)
                return HttpResponse('Error al recibir access token')
    elif error:
        if error == 'access_denied':
            return HttpResponse("Debe aceptar la aplicación Turicor para poder iniciar sesión.")
    return HttpResponse("Ha ocurrido un error")


def login(request):
    url = settings.URL_AUTHORIZATION
    url += '?response_type=code&client_id=' + settings.CLIENT_ID + '&'
    url += 'scope=' + settings.SCOPE + '&'
    url += 'redirect_uri=' + settings.REDIRECT_URI
    return HttpResponseRedirect(url)


def prueba_tmpl(request):
    return render(request, 'turicor/prueba.html', {})


def ciudades_api(request):
    resultado = {}
    if request.method == 'GET':
        """ Obtener las ciudades """
    elif request.method == 'PUT':
        """ Registrar una nueva ciudad """

    return HttpResponse(json.dumps(resultado))


def paises_api(request):
    resultado = {}
    if request.method == 'GET':
        try:
            paises_response = soap.service.ConsultarPaises()
            paises = paises_response['Paises']['PaisEntity']
            resultado = paises
        except Exception as exc:
            print(exc)
            resultado['error'] = 'Ha ocurrido un error al obtener los paises.'
    return HttpResponse(json.dumps(resultado))
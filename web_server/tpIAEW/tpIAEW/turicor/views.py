import requests
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.conf import settings
from django.contrib.auth import login, logout
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required


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
            return HttpResponse('Debe aceptar la aplicación Turicor para poder iniciar sesión.')
    return HttpResponse("Ha ocurrido un error")


def login_redirect(request):
    url = settings.URL_AUTHORIZATION
    url += '?response_type=code&client_id=' + settings.CLIENT_ID + '&'
    url += 'scope=' + settings.SCOPE + '&'
    url += 'redirect_uri=' + settings.REDIRECT_URI
    return render(request, 'turicor/login.html', {'url_autenticacion': url})


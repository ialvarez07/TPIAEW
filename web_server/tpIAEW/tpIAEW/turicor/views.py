import requests
import uuid
import datetime
from django.http import HttpResponse, HttpResponseRedirect, HttpResponseServerError, HttpResponseNotAllowed
from django.conf import settings


def oauth_callback(request):
    code = request.GET.get('code', None)
    scope = request.GET.get('scope', None)
    error = request.GET.get('error', None)
    if code and scope:
        print("Código recibido: %s" % code)
        codigo_aleatorio = uuid.uuid4()
        datos = {
            'grant_type': 'authorization_code',
            'redirect_uri': settings.REDIRECT_URI,
            'client_id': settings.CLIENT_ID,
            'client_secret': settings.CLIENT_SECRET,
            'code': code,
            'state': codigo_aleatorio
        }
        response = requests.post(settings.URL_ACCESS_TOKEN, datos)
        if response.content:
            try:
                dic = response.json()
                print(dic)
                if dic['access_token'] and dic['scope'] == 'read':  # and dic['state'] == codigo_aleatorio:
                    at = dic['access_token']
                    tiempo_expiracion_str = dic['expires_in']
                    expiracion = datetime.datetime.strftime(datetime.datetime.utcnow() +
                                                            datetime.timedelta(seconds=int(tiempo_expiracion_str)),
                                                            "%a, %d-%b-%Y %H:%M:%S GMT")
                    response = HttpResponseRedirect(settings.URL_NEXT_TURICOR)
                    at = 'Bearer ' + at
                    response.set_cookie('access_token', at, expires=expiracion)
                    print("Access token recibido: %s" % at)
                    return response
            except Exception as exc:
                print(exc)
                return HttpResponseServerError()
    elif error:
        if error == 'access_denied':
            return HttpResponseNotAllowed()
    return HttpResponseServerError


def login_redirect(request):
    url = settings.URL_AUTHORIZATION
    url += '?response_type=code&client_id=' + settings.CLIENT_ID + '&'
    url += 'scope=' + settings.SCOPE + '&'
    url += 'redirect_uri=' + settings.REDIRECT_URI
    return HttpResponseRedirect(url)

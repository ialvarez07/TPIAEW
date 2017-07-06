import requests
from functools import wraps
from django.http import HttpResponseNotAllowed
from django.conf import settings


def access_token_requerido(funcion):
    @wraps(funcion)
    def verificar(*args, **kwargs):
        request = args[0]
        autorizacion = request.META.get('HTTP_AUTHORIZATION', None)
        print("Authorization: %s" % autorizacion[1:-1])
        if autorizacion:
            access_token = obtener_access_token(autorizacion[1:-1])
            if validar_access_token(access_token):
                return funcion(*args, **kwargs)

        return HttpResponseNotAllowed('')

    return verificar


def obtener_access_token(barear):
    """
    :param barear: String que contiene por ejemplo: Barear <access_token>
    :return: Un string con el access token
    """
    access_token = ''
    lista = barear.split()
    if len(lista) == 2:
        access_token = lista[1]

    return access_token


def validar_access_token(access_token):
    valido = False
    print("Por validar el token: [%s]" % access_token)
    try:
        response = requests.get(settings.URL_TOKEN_INFO, {'access_token': access_token})
        if response.status_code == 200 and response.content:
            dic = response.json()
            print("Recibido: ", dic)
            expira_en = dic['expires_in']
            if int(expira_en) > 0:
                valido = True
    except Exception as exc:
        print(exc)
    return valido

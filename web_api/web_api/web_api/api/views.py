import json
from django.http import HttpResponse
from .decoradores import access_token_requerido


@access_token_requerido
def ciudades(request):
    resultado = {}
    if request.method == 'GET':
        lista_ejemplo = [
            {
                'id': 1,
                'nombre': 'Cordoba'
            },
            {
                'id': 2,
                'nombre': 'Rosario'
            }
        ]
        resultado = lista_ejemplo
    return HttpResponse(json.dumps(resultado))


def ciudad(request, id_ciudad):
    resultado = {}
    if request.method == 'GET':
        ejemplo = {
                    'id': id_ciudad,
                    'nombre': 'Córdoba'
                }
        resultado = ejemplo
    return HttpResponse(json.dumps(resultado))

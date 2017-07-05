import datetime
import json
import pdb

import pytz
from decimal import Decimal
from django.http import HttpResponse

from zeep import Client, Transport
from zeep.cache import SqliteCache

from django.conf import settings
from zeep.helpers import serialize_object
from dateutil import parser


from .util import serializar, DecimalEncoder

transport = Transport(cache=SqliteCache())
soap = Client(settings.URL_WSDL, transport=transport)
client = Client("http://romeroruben-001-site1.itempurl.com/WCFReservaVehiculos.svc?singlewsdl")

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


def getPaises(request):
    data = serialize_object(client.service.ConsultarPaises())
    data = data['Paises']['PaisEntity']
    data_json = json.dumps(data)
    return HttpResponse(data_json, content_type='application/json')


def getCiudades(request, idPais):
    data = serialize_object(client.service.ConsultarCiudades({"IdPais": idPais}))
    data = data['Ciudades']['CiudadEntity']
    data_json = json.dumps(data)
    return HttpResponse(data_json, content_type='application/json')


def getVehiculosDisponibles(request, idCiudad):
    retiro_str = request.GET.get('retiro')[:-6].__str__()
    devolucion_str = request.GET.get('devolucion')[:-6].__str__()

    retiro_date = parser.parse(retiro_str)
    devolucion_date = parser.parse(devolucion_str)

    retiro = datetime.datetime.strptime(retiro_date.__str__()[:-6], '%Y-%m-%d %H:%M:%S')
    devolucion = datetime.datetime.strptime(devolucion_date.__str__()[:-6], '%Y-%m-%d %H:%M:%S')

    datos = {'IdCiudad': idCiudad, 'FechaHoraRetiro': retiro, 'FechaHoraDevolucion': devolucion}
    data = serialize_object(soap.service.ConsultarVehiculosDisponibles(datos))
    data = data['VehiculosEncontrados']['VehiculoModel']
    data_json = json.dumps(data, cls=DecimalEncoder)
    return HttpResponse(data_json, content_type='application/json')

import datetime
import json

import pytz
from decimal import Decimal
from django.http import HttpResponse
from zeep import Client, Transport
from zeep.cache import SqliteCache

from django.conf import settings
from zeep.helpers import serialize_object


from .util import serializar, DecimalEncoder

transport = Transport(cache=SqliteCache())
soap = Client(settings.URL_WSDL, transport=transport)
client = Client("http://romeroruben-001-site1.itempurl.com/WCFReservaVehiculos.svc?singlewsdl")


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


def getVehiculosDisponibles(request):
    idCiudad = request.GET.get('idCiudad');
    print(idCiudad)
    retiro = datetime.datetime.strptime('2017-07-02 17:08:16', '%Y-%m-%d %H:%M:%S')
    devolucion = datetime.datetime.strptime('2017-07-02 20:08:16', '%Y-%m-%d %H:%M:%S')
    datos = {'IdCiudad': 2, 'FechaHoraRetiro': retiro, 'FechaHoraDevolucion': devolucion}
    data = serialize_object(soap.service.ConsultarVehiculosDisponibles(datos))
    data = data['VehiculosEncontrados']['VehiculoModel']
    data_json = json.dumps(data, cls=DecimalEncoder)
    return HttpResponse(data_json, content_type='application/json')

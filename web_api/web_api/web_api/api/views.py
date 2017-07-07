import datetime
import json
import pdb
from django.http import HttpResponse, HttpResponseBadRequest
from zeep import Client, Transport
from zeep.cache import SqliteCache
from django.conf import settings
from zeep.helpers import serialize_object
from dateutil import parser


from .util import parsearFecha, MyEncoder
from .decoradores import access_token_requerido
from .models import Reserva, Cliente, Vendedor


transport = Transport(cache=SqliteCache())
soap = Client(settings.URL_WSDL, transport=transport)
client = Client("http://romeroruben-001-site1.itempurl.com/WCFReservaVehiculos.svc?singlewsdl")


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


@access_token_requerido
def ciudad(request, id_ciudad):
    resultado = {}
    if request.method == 'GET':
        ejemplo = {
                    'id': id_ciudad,
                    'nombre': 'Córdoba'
                }
        resultado = ejemplo
    return HttpResponse(json.dumps(resultado))

@access_token_requerido
def getClientes(request):
    clientes = Cliente.objects.all()
    results = [c.dic() for c in clientes]
    return HttpResponse(json.dumps(results), content_type='application/json')

@access_token_requerido
def getVendedores(request):
    vendedores = Vendedor.objects.all()
    results = [v.dic() for v in vendedores]
    return HttpResponse(json.dumps(results), content_type='application/json')

@access_token_requerido
def getPaises(request):
    data = serialize_object(client.service.ConsultarPaises())
    data = data['Paises']['PaisEntity']
    data_json = json.dumps(data)
    return HttpResponse(data_json, content_type='application/json')


@access_token_requerido
def getCiudades(request, idPais):
    data = serialize_object(client.service.ConsultarCiudades({"IdPais": idPais}))
    data = data['Ciudades']['CiudadEntity']
    data_json = json.dumps(data)
    return HttpResponse(data_json, content_type='application/json')


@access_token_requerido
def getVehiculosDisponibles(request, idCiudad):
    retiro_str = request.GET.get('retiro')
    devolucion_str = request.GET.get('devolucion')
    retiro = parsearFecha(retiro_str)
    devolucion = parsearFecha(devolucion_str)

    datos = {'IdCiudad': idCiudad, 'FechaHoraRetiro': retiro, 'FechaHoraDevolucion': devolucion}
    data = serialize_object(soap.service.ConsultarVehiculosDisponibles(datos))
    data = data['VehiculosEncontrados']['VehiculoModel']
    data_json = json.dumps(data, cls=MyEncoder)
    return HttpResponse(data_json, content_type='application/json')

@access_token_requerido
def reservas(request):
    if request.method == 'GET':
        """Devuelve todas las reservas"""
        reservas = Reserva.objects.all()
        lista = []
        for reserva in reservas:
            lista.append(reserva.dic())

        return HttpResponse(json.dumps(lista, cls=MyEncoder), content_type="application/json")
    elif request.method == 'POST':
        """Registra una reserva"""
        datos_input = json.loads(request.body.decode("utf-8"))
        nombre = datos_input['nombre']
        apellido = datos_input['apellido']
        dni = datos_input['dni']
        fechaRetiro = datos_input['fechaRetiro']
        fechaDevolucion = datos_input['fechaDevolucion']
        idVehiculoCiudad = datos_input['idVehiculoCiudad']
        idCliente = datos_input['idCliente']
        idVendedor = datos_input['idVendedor']

        idPais = datos_input['idPais']

        if nombre and apellido and dni and idVehiculoCiudad and fechaDevolucion and fechaRetiro:
                #and idCliente and idVendedor:
            datos = {
                'ApellidoNombreCliente': "%s , %s" % (apellido, nombre),
                'FechaHoraDevolucion': parsearFecha(fechaDevolucion),
                'FechaHoraRetiro': parsearFecha(fechaRetiro),
                'IdVehiculoCiudad': idVehiculoCiudad,
                'NroDocumentoCliente': dni
            }
            response = soap.service.ReservarVehiculo(datos)
            data = serialize_object(response)
            data = data['Reserva']


            #TODO Deberia buscar los del angular
            cliente = Cliente.objects.get(id=idCliente)
            vendedor = Vendedor.objects.get(id=idVendedor)
            #data = json.dumps(data, cls=MyEncoder)

            datos_reserva = Reserva(
                codigo_reserva=data['CodigoReserva'],
                fecha_reserva=data['FechaReserva'],
                id_cliente=cliente,
                id_vendedor=vendedor,
                costo=float(data['VehiculoPorCiudadEntity']['VehiculoEntity']['PrecioPorDia']),
                precio_venta=float(data['VehiculoPorCiudadEntity']['VehiculoEntity']['PrecioPorDia'])*1.20,
                id_vehiculo_ciudad=data['VehiculoPorCiudadId'],
                id_ciudad=data['VehiculoPorCiudadEntity']['CiudadId'],
                id_pais=idPais,
                )
            reserva = Reserva.save(datos_reserva)
        else:
            return HttpResponseBadRequest('Faltan datos')
    return HttpResponseBadRequest('')
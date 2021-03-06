from django.conf.urls import url

from . import views

app_name = 'api'

urlpatterns = [
    url(r'^paises/$', views.getPaises, name='paises'),
    url(r'^ciudades/(?P<idPais>\d+)/$', views.getCiudades, name='ciudades'),
    url(r'^ciudades/(?P<idCiudad>\d+)/vehiculos/$', views.getVehiculosDisponibles, name='vehiculos_disponibles'),
    url(r'^reservas/$', views.reservas, name='reservas'),
    url(r'^reservas/(?P<idReserva>\d+)/$', views.reserva, name='reserva'),
    url(r'^clientes/$', views.getClientes, name='clientes'),
    url(r'^vendedores/$', views.getVendedores, name='vendedores'),

]

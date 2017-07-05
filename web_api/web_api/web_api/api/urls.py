from django.conf.urls import url

from . import views

app_name = 'api'

urlpatterns = [
    url(r'^paises/$', views.getPaises, name='paises'),
    url(r'^ciudades/(?P<idPais>\d+)/$', views.getCiudades, name='ciudades'),
    url(r'^ciudades/(?P<idCiudad>\d+)/vehiculos/$', views.getVehiculosDisponibles, name='vehiculos_disponibles'),
]

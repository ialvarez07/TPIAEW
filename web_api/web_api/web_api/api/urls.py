from django.conf.urls import url

from . import views

app_name = 'api'

urlpatterns = [
    url(r'^ciudades/$', views.ciudades, name='ciudades'),
    url(r'^ciudades/(?P<year>[0-9]{4})/$', views.ciudad, name='ciudad'),
]

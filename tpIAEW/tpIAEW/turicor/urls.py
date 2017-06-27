from django.conf.urls import url

from . import views

app_name = 'turicor'

urlpatterns = [
    url(r'^$', views.index_tmpl, name='index_tmpl'),
    url(r'^oauth2/callback', views.oauth_callback, name='callback'),
    url(r'^login/', views.login_tmpl, name='login_tmpl'),
    url(r'^logout/', views.cerrar_sesion, name='cerrar_sesion'),
    url(r'^prueba/', views.prueba_tmpl, name='prueba_tmpl'),
    url(r'^api/pais/$', views.paises_api, name='paises_api'),
    url(r'^api/ciudad/$', views.ciudades_api, name='ciudades_api'),
]

from django.conf.urls import url

from . import views

app_name = 'turicor'

urlpatterns = [
    url(r'^oauth2/callback', views.oauth_callback, name='callback'),
    url(r'^login/', views.login, name='login'),
    url(r'^api/pais/$', views.paises_api, name='paises_api'),
    url(r'^api/ciudad/$', views.ciudades_api, name='ciudades_api'),
]

from django.conf.urls import url

from . import views

app_name = 'turicor'

urlpatterns = [
    url(r'^oauth2/callback', views.oauth_callback, name='callback'),
    url(r'^login/', views.login_redirect, name='login_tmpl'),
]

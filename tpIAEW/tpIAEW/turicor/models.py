from __future__ import unicode_literals
from django.db import models


class Cliente(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    nro_documento = models.CharField(max_length=20)

    class Meta:
        managed = False
        db_table = 'Clientes'


class Reserva(models.Model):
    codigo_reserva = models.CharField(max_length=50)
    fecha_reserva = models.CharField(max_length=50)
    id_cliente = models.ForeignKey(Cliente, models.DO_NOTHING, db_column='id_cliente')
    id_vendedor = models.ForeignKey('Vendedor', models.DO_NOTHING, db_column='id_vendedor')
    costo = models.DecimalField(max_digits=8, decimal_places=2)
    precio_venta = models.DecimalField(max_digits=8, decimal_places=2)
    id_vehiculo_ciudad = models.IntegerField()
    id_ciudad = models.IntegerField()
    id_pais = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'Reservas'


class Vendedor(models.Model):
    nombre = models.CharField(max_length=200)

    class Meta:
        managed = False
        db_table = 'Vendedores'


class Token(models.Model):
    token = models.CharField(max_length=250)
    expira = models.DateTimeField()
    token_refresh = models.CharField(max_length=250)

    class Meta:
        managed = False
        db_table = 'Tokens'
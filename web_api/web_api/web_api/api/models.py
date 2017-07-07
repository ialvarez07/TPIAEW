from django.db import models


class Cliente(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    nro_documento = models.CharField(max_length=20, unique=True)

    def dic(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "apellido": self.apellido,
            "nro_documento": self.nro_documento
        }


    class Meta:
        managed = False
        db_table = 'Cliente'


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

    def dic(self):
        return {
            "id": self.id,
            "codigo_reserva": self.codigo_reserva,
            "id_cliente": self.id_cliente.id,
            "id_vendedor": self.id_vendedor.id,
            "costo": self.costo,
            "precio_venta": self.precio_venta,
            "id_vehiculo_ciudad": self.id_vehiculo_ciudad,
            "id_ciudad": self.id_ciudad,
            "id_pais": self.id_pais
        }

    class Meta:
        managed = False
        db_table = 'Reserva'


class Vendedor(models.Model):
    nombre = models.CharField(max_length=200)

    def dic(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
        }

    class Meta:
        managed = False
        db_table = 'Vendedor'

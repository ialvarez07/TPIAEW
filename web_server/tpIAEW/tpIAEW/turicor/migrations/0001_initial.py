# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2017-06-30 15:57
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Cliente',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
                ('apellido', models.CharField(max_length=100)),
                ('nro_documento', models.CharField(max_length=20)),
            ],
            options={
                'db_table': 'Clientes',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Reserva',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('codigo_reserva', models.CharField(max_length=50)),
                ('fecha_reserva', models.CharField(max_length=50)),
                ('costo', models.DecimalField(decimal_places=2, max_digits=8)),
                ('precio_venta', models.DecimalField(decimal_places=2, max_digits=8)),
                ('id_vehiculo_ciudad', models.IntegerField()),
                ('id_ciudad', models.IntegerField()),
                ('id_pais', models.IntegerField()),
            ],
            options={
                'db_table': 'Reservas',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Token',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('token', models.CharField(max_length=250)),
                ('expira', models.DateTimeField()),
                ('token_refresh', models.CharField(max_length=250)),
            ],
            options={
                'db_table': 'Tokens',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Vendedor',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=200)),
            ],
            options={
                'db_table': 'Vendedores',
                'managed': False,
            },
        ),
    ]

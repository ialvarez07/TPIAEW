// 'CantidadDisponible': 50,
//   'CantidadPuertas': 5,
//   'CiudadId': 2,
//   'Id': 1,
//   'Marca': 'CHEVROLET',
//   'Modelo': 'SPARK',
//   'PrecioPorDia': Decimal('200'),
//   'Puntaje': '5',
//   'TieneAireAcon': True,
//   'TieneDireccion': True,
//   'TipoCambio': 'M',
//   'VehiculoCiudadId': 3

export class Vehiculo{
  id:number;
  marca:string;
  modelo:string;
  ciudad_id:number;
  cantidad_disponible:number;
  cantidad_puertas:number;
  precio_por_dia:number;
  puntaje:number;
  tiene_aire_acon:boolean;
  tiene_direccion:boolean;
  tipo_cambio:string;
  vehiculo_ciudad_id:number;
}

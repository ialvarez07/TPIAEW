import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response, URLSearchParams} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {Pais} from "../models/pais";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import {Ciudad} from "../models/ciudad";
import {Vehiculo} from "../models/vehiculo";
import {Reserva} from "../models/reserva";
import {Vendedor} from "../models/vendedor";
import {Cliente} from "../models/cliente";
@Injectable()
export class AppService {
  private apiUrl = 'http://127.0.0.1:8080/api/';
  private vehiculo:Vehiculo;
  private retiro:Date;
  private devolucion:Date;
  private pais:Pais;
  constructor(private http: Http) {
  }

  private getHeaders() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', getAccessToken());
    return headers;
  }

  getClientesObservable(): Observable<Cliente[]> {
    let cliente = this.http
      .get(`${this.apiUrl}`+'clientes/', {headers: this.getHeaders()})
      .map(response =>response.json().map(toCliente));
    return cliente;
  }

  getVendedoresObservable(): Observable<Vendedor[]> {
    let vendedor = this.http
      .get(`${this.apiUrl}`+'vendedores/', {headers: this.getHeaders()})
      .map(response =>response.json().map(toVendedor));
    return vendedor;
  }

  getPaisesObservable(): Observable<Pais[]> {
    let pais$ = this.http
      .get(`${this.apiUrl}`+'paises/', {headers: this.getHeaders()})
      .map(response =>response.json().map(toPais));
    return pais$;
  }


  getCiudadesObservable(id: number): Observable<Ciudad[]>{
    let ciudad = this.http
      .get(`${this.apiUrl}`+'ciudades/' + id + "/", {headers: this.getHeaders()})
      .map(response =>response.json().map(toCiudad));
    return ciudad;
  }

  getVehiculosDisponible(idCiudad:number, retiro:Date, devolucion:Date): Observable<Vehiculo[]>{
    let params:URLSearchParams = new URLSearchParams;
    params.set('retiro', retiro.toString());
    params.set('devolucion', devolucion.toString());
    let requestOptions = new RequestOptions();
    requestOptions.params = params;
    return this.http
      .get(`${this.apiUrl}`+'ciudades/'+idCiudad +'/vehiculos/', {headers: this.getHeaders(), params:params})
      .map(response =>response.json().map(toVehiculo));
  }

   realizarReserva(nombre:string, apellido:string, dni:string, fechaRetiro:Date,
                   fechaDevolucion:Date, vehiculo:Vehiculo, pais:Pais,idCliente:number, idVendedor:number):Observable<Reserva>{
    let body:any = {nombre:nombre,apellido:apellido, dni:dni, fechaRetiro:fechaRetiro.toString(),
      fechaDevolucion:fechaDevolucion.toString(),
    idVehiculoCiudad:vehiculo.vehiculo_ciudad_id,
    idPais:pais.id, idCliente:idCliente, idVendedor:idVendedor};

    let options = new RequestOptions({headers:this.getHeaders()})
    let reserva = this.http.post(`${this.apiUrl}`+'reservas/',body,options)
      .map(toReserva).catch(this.handleError);
    return reserva;
  }

  getReservas():Observable<Reserva[]>{
    let reserva = this.http
      .get(`${this.apiUrl}`+'reservas/', {headers: this.getHeaders()})
      .map(response =>response.json().map(toReserva));
    return reserva;
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  setVehiculo(vehiculo:Vehiculo){
    this.vehiculo = vehiculo;
  }

  setFechaRetiro(retiro:Date){
    this.retiro = retiro;
  }

  setFechaDevolucion(devolucion:Date){
    this.devolucion = devolucion;
  }
  setPais(pais:Pais){
    this.pais = pais;
  }


  get getVehiculo(): Vehiculo {
    return this.vehiculo;
  }

  get getRetiro(): Date {
    return this.retiro;
  }

  get getDevolucion(): Date {
    return this.devolucion;
  }
  get getPais(): Pais{
    return this.pais;
  }
}

function toPais(r: any): Pais {
  let pais = <Pais>({
    id: r.Id,
    name: r.Nombre,
  });
  return pais;
}

function toVendedor(r: any): Vendedor {
  let vendedor = <Vendedor>({
    id: r.id,
    name: r.nombre,
  });
  return vendedor;
}

function toCliente(r: any): Cliente {
  let cliente = <Cliente>({
    id: r.id,
    name: r.nombre,
    apellido: r.apellido,
    dni: r.dni,
  });
  return cliente;
}


function toCiudad(r: any): Pais {
  let ciudad = <Ciudad>({
    id: r.Id,
    name: r.Nombre,
  });
  return ciudad;
}

function toVehiculo(r: any): Vehiculo{
  let vehiculo = <Vehiculo>({
    id: r.Id,
    marca: r.Marca,
    modelo:r.Modelo,
    ciudad_id: r.CiudadId,
    cantidad_disponible:r.CantidadDisponible,
    cantidad_puertas:r.CantidadPuertas,
    precio_por_dia:r.PrecioPorDia,
    puntaje: r.Puntaje,
    tiene_aire_acon: r.TieneAireAcon,
    tiene_direccion: r.TieneDireccion,
    tipo_cambio: r.TipoCambio,
    vehiculo_ciudad_id: r.VehiculoCiudadId
  });
  return vehiculo;
}

function toReserva(r:any):Reserva{
  let reserva = {
    id: r.id,
    codigoReserva:r.codigoReserva,
    idVendedor:r.id_vendedor,
    idCliente: r.id_cliente,
    precioVenta: r.precio_venta,
    costo: r.costo,
    id_vehiculo_ciudad:r.id_vehiculo_ciudad,
    id_ciudad:r.id_ciudad,
    id_pais:r.id_pais
  };
  return reserva;
}

export function getAccessToken(): string {
  let cookies: Array<string> = document.cookie.split(';');
  let cookiesLen: number = cookies.length;
  let cookieName = 'access_token';
  let c: string;

  for (let i: number = 0; i < cookiesLen; i += 1) {
    c = cookies[i].replace(/^\s+/g, '');
    if (c.indexOf(cookieName) == 0) {
      return c.substring(cookieName.length + 1, c.length);
    }
  }
  return '';
}

import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response, URLSearchParams} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {Pais} from "../models/pais";
import 'rxjs/add/operator/map'
import {Ciudad} from "../models/ciudad";
import {Vehiculo} from "../models/vehiculo";
import {Params} from "@angular/router";
@Injectable()
export class AppService {
  private apiUrl = 'http://127.0.0.1:8080/api/';
  private headers = new Headers({
    'Content-Type': 'application/json'
  });
  private vehiculo:Vehiculo;
  private retiro:Date;
  private devolucion:Date;

  constructor(private http: Http) {

  }

  private getHeaders() {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Authorization', getAccessToken());
    return headers;
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

  setVehiculo(vehiculo:Vehiculo){
    this.vehiculo = vehiculo;
  }

  setFechaRetiro(retiro:Date){
    this.retiro = retiro;
  }

  setFechaDevolucion(devolucion:Date){
    this.devolucion = devolucion;
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
}

function toPais(r: any): Pais {
  let pais = <Pais>({
    id: r.Id,
    name: r.Nombre,
  });
  return pais;
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

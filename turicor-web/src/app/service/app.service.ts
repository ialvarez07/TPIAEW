import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response, URLSearchParams} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {Pais} from "../models/pais";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import {Ciudad} from "../models/ciudad";
import {Vehiculo} from "../models/vehiculo";
import {Reserva} from "../models/reserva";
@Injectable()
export class AppService {
  private apiUrl = 'http://127.0.0.1:8080/api/';
  private vehiculo:Vehiculo;
  private retiro:Date;
  private devolucion:Date;

  constructor(private http: Http) {
  }

  private getHeaders() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
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

   realizarReserva(nombre:string, apellido:string, dni:string, lugarRetiro:string, lugarDevolucion:string, retiro:Date,
                   devolucion:Date, vehiculo:Vehiculo):Observable<Reserva>{
    let body:any = {nombre:nombre, dni:dni};
    let options = new RequestOptions({headers:this.getHeaders()})
    console.log("llega");
    let reserva = this.http.post(`${this.apiUrl}`+'reservas/',body,options)
      .map(toReserva).catch(this.handleError);
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

function toReserva(r:any):Reserva{
  let reserva = {
    id: r.Id,
    codigoReserva:r.CodigoReserva,
    idVendedor:r.IdVendedor,
    idCliente: r.IdCliente,
    costo: r.Costo,
    precioVenta: r.PrecioVenta
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

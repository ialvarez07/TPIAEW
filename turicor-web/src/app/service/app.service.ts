import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {Pais} from "../models/pais";
import 'rxjs/add/operator/map'
import {Ciudad} from "../models/ciudad";
import {Vehiculo} from "../models/vehiculo";
import {Params} from "@angular/router";
@Injectable()
export class AppService {
  private apiUrl = 'http://127.0.0.1:8000/api/';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  private getHeaders() {
    // I included these headers because otherwise FireFox
    // will request text/html instead of application/json
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }

  getPaisesObservable(): Observable<Pais[]> {
    let pais$ = this.http
      .get(`${this.apiUrl}`+'paises/')
      .map(response =>response.json().map(toPais));
    return pais$;
  }


  getCiudadesObservable(id: number): Observable<Ciudad[]>{
    let ciudad = this.http
      .get(`${this.apiUrl}`+'ciudades/' + id + "/")
      .map(response =>response.json().map(toCiudad));
    return ciudad;
  }

  getVehiculosDisponible(idCiudad:number, retiro:Date, devolucion:Date): Observable<Vehiculo[]>{
    let params:URLSearchParams = new URLSearchParams();
    params.append('idCiudad', idCiudad.toString());
    params.append('retiro', retiro.toDateString());
    params.append('devolucion', devolucion.toDateString());
    console.log("Llega");
    return this.http
      .get(`${this.apiUrl}`+'vehiculos/', {params:params})
      .map(response =>response.json().map(toVehiculo));

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
  });
  return vehiculo;
}

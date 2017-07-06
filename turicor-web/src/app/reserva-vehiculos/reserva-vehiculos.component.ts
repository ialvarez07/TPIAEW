import {Component, Input, OnInit} from '@angular/core';
import {Vehiculo} from "../models/vehiculo";
import {AppService} from "../service/app.service";
import {validate} from "codelyzer/walkerFactory/walkerFn";

@Component({
  selector: 'app-reserva-vehiculos',
  templateUrl: './reserva-vehiculos.component.html',
  styleUrls: ['./reserva-vehiculos.component.css']
})
export class ReservaVehiculosComponent implements OnInit {
  fechaActual:number;
  retiro:Date;
  devolucion:Date;
  vehiculo:Vehiculo;
  nombreYApellido:String;
  nroDni:String;
  lugarRetiro:String;
  lugarDevolucion:String;
  constructor(private appService:AppService) {
    this.fechaActual = Date.now();
  }

  ngOnInit() {
    this.retiro = this.appService.getRetiro;
    this.devolucion = this.appService.getDevolucion;
    this.vehiculo = this.appService.getVehiculo;
  }

  reservar(){
    this.validarDatos();

  }

  validarDatos(){
    if(this.nombreYApellido == ""){
      //TODO MENSAJE ERROR
    }
    if(this.nroDni == ""){
      //TODO MENSAJE ERROR
    }
    if(this.lugarRetiro == ""){

    }
    if(this.lugarDevolucion == ""){

    }
    if(this.vehiculo.id == null){

    }
  }
}

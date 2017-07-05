import {Component, Input, OnInit} from '@angular/core';
import {Vehiculo} from "../models/vehiculo";
import {AppService} from "../service/app.service";

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

  constructor(private appService:AppService) {
    this.fechaActual = Date.now();
  }

  ngOnInit() {
    this.retiro = this.appService.getRetiro;
    this.devolucion = this.appService.getDevolucion;
    this.vehiculo = this.appService.getVehiculo;
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {Vehiculo} from "../models/vehiculo";
import {AppService} from "../service/app.service";
import {validate} from "codelyzer/walkerFactory/walkerFn";
import {Pais} from "../models/pais";
import {Cliente} from "../models/cliente";
import {Vendedor} from "../models/vendedor";

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
  nombre:string;
  apellido:string;
  nroDni:string;
  lugarRetiro:string;
  lugarDevolucion:string;
  pais:Pais;
  clientes:Cliente[];
  clienteSeleccionado:Cliente;
  vendedores:Vendedor[];
  vendedorSeleccionado:Vendedor;

  constructor(private appService:AppService) {
    this.fechaActual = Date.now();
  }

  ngOnInit() {
    this.retiro = this.appService.getRetiro;
    this.devolucion = this.appService.getDevolucion;
    this.vehiculo = this.appService.getVehiculo;
    this.pais = this.appService.getPais;
    this.getClientes();
    this.getVendedores();
  }

  getVendedores(): void {
    this.appService.getVendedoresObservable()
      .subscribe(vendedores => this.vendedores = vendedores);
  }

  getClientes(): void {
    this.appService.getClientesObservable()
      .subscribe(clientes => this.clientes = clientes);
  }
  reservar(){
    this.validarDatos();
     this.appService.realizarReserva(this.nombre,this.apellido,this.nroDni,
     this.retiro,this.devolucion, this.vehiculo,this.pais,this.vendedorSeleccionado.id).subscribe();
  }


  validarDatos(){
    if(this.nombre== ""){
      //TODO MENSAJE ERROR
    }
    if(this.apellido == ""){

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

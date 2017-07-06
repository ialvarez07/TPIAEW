import {Component, Directive, ElementRef, OnInit, Input} from '@angular/core';
import {Pais} from "../models/pais";
import {Vehiculo} from "app/models/vehiculo";
import {Ciudad} from "../models/ciudad";
import {AppService} from "app/service/app.service";

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css'],
})


export class ReservaComponent implements OnInit {
  paises: Pais[];
  ciudades: Ciudad[];
  vehiculos: Vehiculo[];
  retiro:Date;
  devolucion:Date;
  selectedPais: Pais;
  selectedCiudad: Ciudad;
  retiroSeleccionado:Date;
  devolucionSeleccionado:Date;

  constructor(
    private appService : AppService,
  //el: ElementRef
  ){
   // el.nativeElement.;
  }

  onChangePaises(pais: Pais): void {
    this.appService.getCiudadesObservable(pais.id)
      .subscribe(ciudades => this.ciudades = ciudades);
  }

  getPaises(): void {
    this.appService.getPaisesObservable()
      .subscribe(paises => this.paises = paises);
  }

  getVehiculosDisponible():void{
    this.appService.getVehiculosDisponible(this.selectedCiudad.id,this.retiro,this.devolucion)
      .subscribe(vehiculos => this.vehiculos = vehiculos);
    this.retiroSeleccionado = this.retiro;
    this.devolucionSeleccionado = this.devolucion;
  }

  hacerReserva(vehiculo:Vehiculo):void{
    this.appService.setVehiculo(vehiculo);
    this.appService.setFechaRetiro(this.retiroSeleccionado);
    this.appService.setFechaDevolucion(this.devolucionSeleccionado);
  }

  ngOnInit(): void {
    this.getPaises();
  }


  /*TODO
      Crear una clase reserva que tenga la fecha de retiro, fecha de devolucion fecha actual y que sea la que se use
       para hacer la reserva en la siguiente pantalla
  */
}

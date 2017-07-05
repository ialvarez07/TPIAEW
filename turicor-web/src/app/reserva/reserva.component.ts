import {Component, Directive, ElementRef, OnInit, Input} from '@angular/core';
import {Pais} from "../models/pais";
import {Vehiculo} from "app/models/vehiculo";
import {Ciudad} from "../models/ciudad";
import {AppService} from "app/service/app.service";

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css'],
  providers: [AppService]
})


export class ReservaComponent implements OnInit {
  paises: Pais[];
  ciudades: Ciudad[];
  vehiculos: Vehiculo[];
  retiro:Date;
  devolucion:Date;
  selectedPais: Pais;
  selectedCiudad: Ciudad;

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
  }

  hacerReserva():void{
    console.log("hace reserva")
  }

  ngOnInit(): void {
    this.getPaises();
  }
}

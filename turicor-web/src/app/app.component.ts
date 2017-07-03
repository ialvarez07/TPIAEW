import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AppService} from "./service/app.service";
import {Pais} from "./models/pais";
import {Ciudad} from "./models/ciudad";
import {CalendarModule} from 'primeng/primeng';
import {Vehiculo} from "./models/vehiculo";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})



export class AppComponent implements OnInit{
  title = 'app';
  paises: Pais[];
  ciudades: Ciudad[];
  vehiculos: Vehiculo[];
  retiro:Date;
  devolucion:Date;
  selectedPais: Pais;
  selectedCiudad: Ciudad;

  constructor(
    private router : Router,
    private appService : AppService
  ){}

  onChangePaises(pais: Pais): void {
    //this.selectedPais = pais;
    this.appService.getCiudadesObservable(pais.id).subscribe(ciudades => this.ciudades = ciudades);
    console.log(this.ciudades);
  }

  getPaises(): void {
    this.appService.getPaisesObservable().subscribe(paises => this.paises = paises);
  }

  getVehiculosDisponible():void{
    console.log(this.retiro.toDateString() + " fecha "+  this.devolucion.toDateString() +" id " + this.selectedCiudad.id)
    this.appService.getVehiculosDisponible(this.selectedCiudad.id,this.retiro,this.devolucion).subscribe(vehiculos => this.vehiculos = vehiculos);
    console.log(this.vehiculos[0].id);
  }

  ngOnInit(): void {
    this.getPaises();
  }
}

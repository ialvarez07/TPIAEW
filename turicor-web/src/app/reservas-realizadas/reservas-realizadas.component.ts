import { Component, OnInit } from '@angular/core';
import {Reserva} from "../models/reserva";
import {AppService} from "../service/app.service";

@Component({
  selector: 'app-reservas-realizadas',
  templateUrl: './reservas-realizadas.component.html',
  styleUrls: ['./reservas-realizadas.component.css']
})
export class ReservasRealizadasComponent implements OnInit {
  reservas:Reserva[];
  constructor(private appService:AppService) { }

  ngOnInit() {
    this.appService.getReservas().subscribe(reservas => this.reservas = reservas);
  }


  cancelarReserva(){

  }
}

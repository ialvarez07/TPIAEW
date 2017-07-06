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
})



export class AppComponent implements OnInit{
  title = 'app';


  constructor(

  ){}


  ngOnInit(): void {

  }
}

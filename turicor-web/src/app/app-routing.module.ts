import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReservaComponent} from "./reserva/reserva.component";
import {ReservaVehiculosComponent} from "./reserva-vehiculos/reserva-vehiculos.component";



const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'reserva',  component: ReservaComponent },
  { path: 'reserva_vehiculos', component: ReservaVehiculosComponent },
  // { path: 'heroes',     component: HeroesComponent }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})


export class AppRoutingModule {}

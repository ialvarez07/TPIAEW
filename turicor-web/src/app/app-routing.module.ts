import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservaComponent } from './reserva/reserva.component';
import { ReservaVehiculosComponent } from './reserva-vehiculos/reserva-vehiculos.component';
import { LoginComponent } from './login/login.component';
import { CheckToken } from './service/check-token.service';


const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full'},
  { path: 'reserva',  component: ReservaComponent, canActivate: [CheckToken] },
  { path: 'reserva_vehiculos', component: ReservaVehiculosComponent, canActivate: [CheckToken] },
  { path: 'login', component: LoginComponent }
  // { path: 'heroes',     component: HeroesComponent }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})


export class AppRoutingModule {}

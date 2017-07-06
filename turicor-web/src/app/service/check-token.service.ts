import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { getAccessToken } from './app.service'

@Injectable()
export class CheckToken implements CanActivate {
  constructor(private router: Router) {
  }
  canActivate(): boolean {
    const token = getAccessToken();
    if (token === '') {
      this.router.navigate(['/login']);
      return false;
    }else {
      return true;
    }
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthentService} from '../features/authent/services/authent.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthentService, private router: Router) {}

  canActivate(): boolean {
    const token = this.authService.getToken();
    if (token && !this.authService.isTokenExpired(token)) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}

// pohjana toiminut Angular-docsin esimerkit ja Tommi Tuikan tutoriaalit

import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  // käytetään apuna Angularin canActicate guardia autentikaatiossa 
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkIfLoggedIn();
  }

  // alla oleva metodi otettu Tommi Tuikan tutoriaaleista
  private checkIfLoggedIn(): boolean {
    if (this.authService.isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['./movie']);
      return false;
    }
  }
}

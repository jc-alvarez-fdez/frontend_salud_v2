// Basado en sprint 7

import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Injectable({ providedIn: 'root' })


export class AuthGuard {
  constructor(
    private router: Router,
    private _authService: AuthService
  ) {}

  canActivate(state: RouterStateSnapshot, activatedRoute: ActivatedRoute): boolean {
    const paciente = this._authService.pacienteValue;
        if (paciente) {
            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}




/* Anterior

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token = localStorage.getItem('token')
    if(token == undefined) {
      this.router.navigate(['auth/login'])
      return false
    }

     return true;
  }

}

*/

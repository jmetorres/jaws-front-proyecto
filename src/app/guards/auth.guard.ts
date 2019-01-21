import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from '../services/security.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private _securityService: SecurityService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._securityService.isAuth()) {
      const loggedUser = JSON.parse(this._securityService.loggedUser());
      if (state.url === '/admin' && loggedUser.authorities[0].authority !== 'ROLE_ADMIN') {
        this.router.navigate(['/usuario']);
      }
      if (state.url === '/usuario' && loggedUser.authorities[0].authority !== 'ROLE_USER') {
        this.router.navigate(['/admin']);
      }
      return true;
    }
    this.router.navigate(['logout']);
    return false;
  }
}

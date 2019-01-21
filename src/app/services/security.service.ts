import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_BACKEND, TOKEN_NAME, PARAM_USUARIO } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  urlOauth = `${URL_BACKEND}/api/security/token`;

  constructor(
    private http: HttpClient,
    private router: Router) { }

  setToken() {
    return this.http.post(this.urlOauth, '');
  }

  logout() {
    sessionStorage.clear();
    console.log('Se borro el token de storage');
    setTimeout(() => {
      this.router.navigate(['/logout']);
    }, 500);
  }

  isAuth() {
    return sessionStorage.getItem(TOKEN_NAME) ? true : false;
  }

  loggedUser(): any {
    return sessionStorage.getItem(PARAM_USUARIO);
  }
}

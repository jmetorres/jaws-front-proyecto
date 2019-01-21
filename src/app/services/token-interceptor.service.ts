import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SecurityService } from './security.service';
import { TOKEN_NAME } from '../constants';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private securityService: SecurityService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem(TOKEN_NAME);
    if (token !== null) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          console.log('token valido');
        }
      }, err => {
        console.log('err: ' + JSON.stringify(err));
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401 || err.status === 403) {
            alert('Ocurri&oacute; un error al validar su token... intente loguearse nuevamente');
            this.securityService.logout();
          }
        }
      })
    );
  }
}

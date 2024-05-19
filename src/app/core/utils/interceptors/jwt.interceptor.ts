import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private _auhtService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // Agregar withCredentials a todas las solicitudes
      request = request.clone({
        withCredentials: true
      });

      return next.handle(request);
    }
}

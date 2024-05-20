import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    //constructor(private _auhtService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // Clona la solicitud para añadir 'withCredentials: true'
      const clonedRequest = request.clone({
        withCredentials: true
      });

      // Pasa la solicitud clonada al siguiente handler
      return next.handle(clonedRequest);
    }
}

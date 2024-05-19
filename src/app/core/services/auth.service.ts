
/* Se encarga de gestionar la autenticación de pacientes. Proporciona métodos para iniciar sesión (login), cerrar sesión (logout) y registrar nuevos usuarios.*/


import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, firstValueFrom, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


import { Paciente } from '../interfaces/paciente.interface';
import { environment } from '../../../environments/environment';
import { StorageService } from './storage.service';



const AUTH_API: string = `${environment.endpoint}auth`
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({ providedIn: 'root' })
export class AuthService {

  private pacienteSubject: BehaviorSubject<Paciente | null>; //Almacena el estado actual del usuario
  public paciente: Observable<Paciente | null>; // expone el valor actual del pacienteSubject

  /*
  Constructor:

Inyecta las dependencias Router y HttpClient.
Crea una instancia de BehaviorSubject inicializada con el usuario obtenido del localStorage (si existe) o null si no hay usuario almacenado.
El observable paciente se crea a partir del pacienteSubject.
*/

  constructor(
      private router: Router,
      private http: HttpClient,
      private _storageService: StorageService
  ) {
      this.pacienteSubject = new BehaviorSubject<Paciente | null>(null);
      this.paciente = this.pacienteSubject.asObservable();
  }

  // Devuelve el valor actual del usuario almacenado en el pacienteSubject
  public get pacienteValue(): Paciente | null  {
    return this.pacienteSubject.value;
}

login(email: string, password: string) {
  return this.http.post<any>(`${AUTH_API}/login`, { email, password }, { withCredentials: true })
    .pipe(map(response => {
      const paciente = response.data.paciente;
      this._storageService.savePaciente(paciente); // Guarda la información del paciente
      this.pacienteSubject.next(paciente);
      return paciente;
    }));
}



register(paciente: Paciente) {
  return this.http.post<any>(`${AUTH_API}/register`, paciente, { withCredentials: true })
      .pipe(map(response => {
        // La lógica para manejar el token se elimina porque se maneja mediante cookies HTTP-only en el backend

        const paciente = response.data.paciente;
        this._storageService.savePaciente(paciente); // Guarda la información del paciente
        this.pacienteSubject.next(paciente);

        const redirectUrl = '/obten_medicacion';
        this.router.navigate([redirectUrl]);

        return paciente;
    }));
  }


  logOut() {
    // Realizar logout y limpiar la información del storage y del BehaviorSubject
    this.http.post<any>(`${AUTH_API}/logout`, {}, { withCredentials: true }).subscribe(() => {
      this._storageService.clean();
      this.pacienteSubject.next(null);
      this.router.navigate(['/login']);
    });
  }

}



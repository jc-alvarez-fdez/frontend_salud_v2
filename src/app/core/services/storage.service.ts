//Este servicio en Angular se encarga de almacenar y recuperar datos del almacenamiento de sesión del navegador. Se utiliza específicamente para manejar información relacionada con el usuario de la aplicación.


import { Injectable } from '@angular/core';

const PACIENTE_KEY = 'auth-paciente'; // Clave para almacenar la información del paciente
const TOKEN_KEY = 'auth-token'; // Clave para almacenar el token de acceso


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  // Elimina todos los datos almacenados en la sesión del navegador
  clean(): void {
    window.sessionStorage.clear();
  }

  // Almacena la información del paciente en el almacenamiento de sesión
  public savePaciente(paciente: any): void {
    window.sessionStorage.removeItem(PACIENTE_KEY); // Elimina cualquier usuario previamente guardado con la clave PACIENTE_KEY
    window.sessionStorage.setItem(PACIENTE_KEY, JSON.stringify(paciente)); //Almacena la cadena JSON en el almacenamiento de sesión
  }

  public getPaciente(): any { //Recupera info paciente del almacenamiento de sesión
    const paciente = window.sessionStorage.getItem(PACIENTE_KEY);
    if (paciente) {
      return JSON.parse(paciente);
    }

    return {};
  }


  public isLoggedIn(): boolean { // Comprueba si hay información de paciente almacenada
    const paciente = window.sessionStorage.getItem(PACIENTE_KEY);
    return paciente !== null;
  }

}

/* En resumen, el servicio StorageService proporciona una forma sencilla de almacenar y recuperar información del usuario en la sesión del navegador. Esto permite a la aplicación mantener el estado del usuario durante la sesión sin depender de las cookies.*/

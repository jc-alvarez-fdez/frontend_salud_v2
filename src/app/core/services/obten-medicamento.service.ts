import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { MedObtenido, MedObtenidoResults } from '../interfaces/medicamento.interface';
import { Router } from '@angular/router';


const OBTEN_MED_API: string = `${environment.endpoint}obten_medicamentos/`
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ObtenMedicamentoService {

  private buscaMed: string = ""


  constructor(
    private router: Router,
    private http: HttpClient) {}




  recibirNombreMed(nombreMed: string){
    this.buscaMed = nombreMed;
    console.log(`Nombre recibido: ${this.buscaMed}`)
    return this.buscaMed;
  }


  getListMedObtenidos(): Observable<MedObtenidoResults> {
    console.log(`nombre del medicamento buscado: ${this.buscaMed}`)
    console.log(`ruta obtener medicamentos: ${environment.cimaUrl}medicamentos?nombre=${this.buscaMed}`)
    return this.http.get<MedObtenidoResults>(`${environment.cimaUrl}medicamentos?nombre=${this.buscaMed}`)
  }


}


/*
Este servicio de Angular se encarga de obtener información sobre medicamentos a partir de un nombre proporcionado por el usuario. Utiliza la inyección de dependencias para acceder a los servicios HttpClient y Router de Angular, y se inyecta en sí mismo en el árbol de componentes a través del decorador @Injectable({ providedIn: 'root' }).

Propiedades

    buscaMed: string = "" (private): Almacena el nombre del medicamento que se está buscando actualmente.

Constructor

    constructor(private router: Router, private http: HttpClient): Inyecta las dependencias del servicio Router para la navegación y HttpClient para realizar peticiones HTTP.

Métodos

    recibirNombreMed(nombreMed: string):
        Recibe el nombre del medicamento introducido por el usuario como argumento nombreMed.
        Almacena el nombre recibido en la propiedad privada buscaMed.
        Imprime por consola el nombre recibido para fines de depuración.
        Devuelve el nombre del medicamento recibido (this.buscaMed).

    getListMedObtenidos(): Observable<MedObtenidoResults>:
        Recupera el nombre del medicamento almacenado en buscaMed.
        Imprime por consola el nombre del medicamento buscado para fines de depuración.
        Construye la URL de la API para obtener medicamentos utilizando la variable de entorno environment.cimaURL y agrega el parámetro nombre con el valor de buscaMed.
        Realiza una petición GET HTTP a la URL usando this.http.get.
        La petición espera recibir una respuesta con formato JSON que se ajuste a la interfaz MedObtenidoResults (la cual probablemente define la estructura de los datos del medicamento obtenido).
        En caso de error en la petición, utiliza el operador catchError de RxJS para manejar el error e informar utilizando el operador throwError.
        Devuelve un Observable que emite los datos del medicamento obtenido o un error si se produce alguno.

Resumen

Este servicio se utiliza para:

    Recibir el nombre del medicamento del usuario a través del método recibirNombreMed.
    Almacenar el nombre del medicamento buscado internamente.
    Construir la URL de la API para obtener medicamentos en función del nombre almacenado.
    Realizar una petición GET HTTP a la API para recuperar los datos del medicamento.
    Devolver un Observable que emite los datos del medicamento obtenido o un error si se produce alguno.

*/


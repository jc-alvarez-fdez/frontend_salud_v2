import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { MiMedicamento } from '../interfaces/medicamento.interface';

@Injectable({
  providedIn: 'root'
})
export class MisMedicamentosService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'mis_medicamentos/'
   }

   getMisMedicamentos(): Observable<MiMedicamento[]> {
    return this.http.get<MiMedicamento[]>(`${this.myAppUrl}${this.myApiUrl}`, { withCredentials: true });
  }

  // Nuevo método para agregar un medicamento
  addMedicamento(medicamento: MiMedicamento): Observable<MiMedicamento> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true // Asegura que las cookies de autenticación se incluyan en la solicitud
    };

    return this.http.post<MiMedicamento>(`${this.myAppUrl}${this.myApiUrl}`, medicamento, httpOptions);
  }
  
}


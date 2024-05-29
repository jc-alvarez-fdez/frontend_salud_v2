import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { MiMedicamento, MiMedicamentoResults } from '../interfaces/medicamento.interface';
import { Router } from '@angular/router';


const MI_MED_API: string = `${environment.endpoint}mis_medicamentos/`
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};




@Injectable({
  providedIn: 'root'
})
export class MisMedicamentosService {


  // private myAppUrl: string;
  // private myApiUrl: string;

  constructor(
    private router: Router,
    private http: HttpClient) {
   }


  // Endpoints

  getListMisMedicamentos(): Observable<MiMedicamentoResults> {
    return this.http.get<MiMedicamentoResults>(MI_MED_API, { withCredentials: true });
  }

/*    getListMisMedicamentos(): Observable<MiMedicamentoResults[]> {
    return this.http.get<MiMedicamento[]>(`${this.myAppUrl}${this.myApiUrl}`, { withCredentials: true });
  } */


  getMiMedicamentoId(id: number): Observable<MiMedicamento[]>{
    return this.http.get<MiMedicamento[]>(`${MI_MED_API}${id}`, { withCredentials: true });
  }


  // Nuevo método para agregar un medicamento
  addMedicamento(medicamento: MiMedicamento): Observable<MiMedicamento> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true // Asegura que las cookies de autenticación se incluyan en la solicitud
    };

    return this.http.post<MiMedicamento>(MI_MED_API, medicamento, httpOptions);
  }

  updateMiMedicamento(id: number, miMedicamento: MiMedicamento): Observable<MiMedicamento> {
    return this.http.put<MiMedicamento>(`${MI_MED_API}${id}`, miMedicamento, { withCredentials: true });
  }

  deleteMiMedicamento(id: number): Observable<MiMedicamento> {
    return this.http.delete<MiMedicamento>(`${MI_MED_API}${id}`, { withCredentials: true });
  }
}


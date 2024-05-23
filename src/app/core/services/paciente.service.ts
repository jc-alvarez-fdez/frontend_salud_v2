import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Paciente } from '../interfaces/paciente.interface';



@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private http: HttpClient) {}

  public API_URL: string = `${environment.endpoint}paciente/`;


  // Endpoints
  getListPacientes(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${this.API_URL}`, { withCredentials: true });
  }

  deletePaciente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}${id}`, { withCredentials: true });

  }

  savePaciente(paciente: Paciente): Observable<void> {
    return this.http.post<void>(`${this.API_URL}`, paciente, { withCredentials: true });
  }

  getPaciente(id: number): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.API_URL}${id}`, { withCredentials: true });
  }

  updatePaciente(id: number, paciente: Paciente): Observable<void> {
    return this.http.put<void>(`${this.API_URL}${id}`, paciente, { withCredentials: true });
  }

}

import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgForOf } from '@angular/common';
import { ObtenMedicamentoService } from '../../core/services/obten-medicamento.service';
import { Router, RouterModule } from '@angular/router';
import { StorageService } from '../../core/services/storage.service';
import { MedObtenido, MedObtenidoResults } from '../../core/interfaces/medicamento.interface';
import { HttpClientModule } from '@angular/common/http';
import { MedicamentoDetailComponent } from '../../components/obten_medicacion/medicamento-detail/medicamento-detail.component';
import { ErrorMessageComponent } from '../../components/obten_medicacion/error-message/error-message.component';
import { EMPTY, Observable, catchError } from 'rxjs';




@Component({
  selector: 'app-medicamentos',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    NgForOf,
    AsyncPipe, MedicamentoDetailComponent, ErrorMessageComponent, // tutorial Programación en español

  ],
  templateUrl: './obten_medicacion.component.html',
  styleUrl: './obten_medicacion.component.scss'
})
export class ObtenMedicacionComponent implements OnInit {

  public medObtenidosResults$!: Observable<MedObtenidoResults>;
  public errorMessage!: string;
  nombreMed: string = '';
  //listMedObtenidos: MedObtenido[] = [];
  //public muchosResultados: number = this.listMedObtenidos.length;


  constructor(
    private router: Router,
    private _obtenMedicamentoService: ObtenMedicamentoService,
    private _storageService: StorageService,
    ) { }

  ngOnInit(): void {

    // Verifica si el usuario está autenticado
    if (!this._storageService.isLoggedIn()) {
      // Si el usuario no está autenticado, redirige a la página de inicio de sesión
      this.router.navigate(['auth/login']);
      return;
    };
/*     if (this.nombreMed.length !== 0)
    this._obtenMedicamentoService.recibirNombreMed(this.nombreMed);
    console.log(`Nombre enviado: ${this.nombreMed} `) */
/*
    this.medObtenidosResults$ = this._obtenMedicamentoService.getListMedObtenidos().pipe(catchError((error: string) => {
      this.errorMessage = error;
      return EMPTY
    })); */
  }


  mostrarMedObtebidos() {
    if (this.nombreMed.trim().length === 0) {
      // No se busca si el nombre está vacío
      this.medObtenidosResults$ = EMPTY; // Emite un Observable vacío
    }
    else {
        this._obtenMedicamentoService.recibirNombreMed(this.nombreMed);
        console.log(`Nombre enviado: ${this.nombreMed} `)
      this.medObtenidosResults$ = this._obtenMedicamentoService.getListMedObtenidos().pipe(catchError((error: string) => {
        this.errorMessage = error;
        return EMPTY
      }));
    }
  }
/*
  public verMedicamento(nregistro: string) {
    this.router.navigate(['/verMedObtenido', nregistro]);
    } */

}



/*

  public getMedicamentosObtenidos(nombreMed: string): void {
    // Implement logic to fetch medicamentos based on nombreMed
    this._obtenMedicamentoService.getObtenMedicamentos()
      .subscribe({
        next: (data) => {
          this.listMedObtenidos = this.listMedObtenidos.concat(data);
          console.log(data);

        },
        error: (error) => {
          if (error.status === 404) this.muchosResultados >= 25;
        }
      });

    // Replace with your actual API call or data retrieval logic
    console.log(`Fetching medicamentos for nombreMed: ${nombreMed}`);
    console.log(`lista medicacmentos: ${this.listMedObtenidos}`)

  }

  public viewMedicamento(nregistro: string) {
    this.router.navigate(['/verMedObtenido']);
    }
    */

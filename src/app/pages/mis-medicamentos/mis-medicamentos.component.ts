import { AsyncPipe, CommonModule, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MisMedicamentosService } from '../../core/services/mis-medicamentos.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MiMedicamentoListComponent } from '../../components/mis_medicamentos/mi-medicamento-list/mi-medicamento-list.component';
import { MiMedicamento, MiMedicamentoResults } from '../../core/interfaces/medicamento.interface';
import { StorageService } from '../../core/services/storage.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EMPTY, Observable, catchError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ErrorMessageComponent } from '../../components/obten_medicacion/error-message/error-message.component';


@Component({
  selector: 'app-mis-medicamentos',
  standalone: true,
  imports: [
  FormsModule,
  CommonModule,
  HttpClientModule,
  NgForOf,
  RouterLink,
  AsyncPipe, MiMedicamentoListComponent, ErrorMessageComponent,
  // tutorial Programación en español


  ],
  templateUrl: './mis-medicamentos.component.html',
  styleUrl: './mis-medicamentos.component.scss'
})
export class MisMedicamentosComponent implements OnInit {

  public miMedicamentoResults$!: Observable<MiMedicamentoResults>;
  //listMisMedicamentos: MiMedicamento[] = [];
  //loading: boolean = false;
  public errorMessage!: string;


  constructor(
    private http: HttpClient,
    private router: Router,
    private _misMedicamentosService: MisMedicamentosService,
    private _storageService: StorageService,
    private toastr: ToastrService
    ) {}

  ngOnInit(): void {
    // Verifica si el usuario está autenticado
    if (!this._storageService.isLoggedIn()) {
      // Si el usuario no está autenticado, redirige a la página de inicio de sesión
      this.router.navigate(['auth/login']);
      return;
    };

    this.mostrarListMisMedicamentos()

  }


  mostrarListMisMedicamentos(){
    this.miMedicamentoResults$ = this._misMedicamentosService.getListMisMedicamentos().pipe(catchError((error: string) => {
      this.errorMessage = error;
      return EMPTY
    }));
  }

  deleteMiMedicamento(id: number) {
    this._misMedicamentosService.deleteMiMedicamento(id)
      .subscribe(data => {
       console.dir(data);
        this.mostrarListMisMedicamentos();
        this.toastr.warning('El paciente se ha eliminado de la base de datos', 'Medicamento eliminado')
    });
    }







}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MisMedicamentosService } from '../../core/services/mis-medicamentos.service';
import { MiMedicamento } from '../../core/interfaces/medicamento.interface';
import { StorageService } from '../../core/services/storage.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-mis-medicamentos',
  standalone: true,
  imports: [
  CommonModule
  ],
  templateUrl: './mis-medicamentos.component.html',
  styleUrl: './mis-medicamentos.component.scss'
})
export class MisMedicamentosComponent implements OnInit {

  listMisMedicamentos: MiMedicamento[] = [];

  constructor(
    private router: Router,
    private _misMedicamentos: MisMedicamentosService,
    private _storageService: StorageService,
    ) {}

  ngOnInit(): void {
    // Verifica si el usuario está autenticado
    if (!this._storageService.isLoggedIn()) {
      // Si el usuario no está autenticado, redirige a la página de inicio de sesión
      this.router.navigate(['/login']);
      return;
    }
  }

  getMisMedicamentos(){
    this._misMedicamentos.getMisMedicamentos().subscribe(data => {
     this.listMisMedicamentos = data;
    })
  }

}

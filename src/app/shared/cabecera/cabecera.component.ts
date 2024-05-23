import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Paciente } from '../../core/interfaces/paciente.interface';
import { AuthService } from '../../core/services/auth.service';


@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterLink
  ],
  templateUrl: './cabecera.component.html',
  styleUrl: './cabecera.component.scss'
})
export class CabeceraComponent implements OnInit {

  paciente?: Paciente | null;
  pacienteNombre: string | null = null; // Para saludar al usuario al inciciar sesión
  pacienteId: number | null = null;

  constructor(
    private _autService: AuthService,
    private router: Router) {
    this._autService.paciente.subscribe(paciente => {
      this.paciente = paciente;
      // Actualizar el nombre del usuario después de iniciar sesión
      this.pacienteNombre = paciente?.nombre || null;
      this.pacienteId = paciente?.id_paciente || null;
      console.log('id del paciente:', this.pacienteId)
    });
  }

  ngOnInit(): void {
      this._autService.paciente.subscribe(paciente => {
        this.paciente = paciente;
      });
  }


  logOut() {
    this._autService.logOut();
    this.router.navigate(['/']);  // Redirige a la página de inicio después de cerrar sesión
  }

  toggleLogin() {
    if (this.paciente) {
      this.logOut();
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

    // Método para obtener el nombre del usuario
    getPacienteNombre(): string | null {
      return this.pacienteNombre;
  }

  


}

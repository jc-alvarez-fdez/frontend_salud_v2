import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
export class CabeceraComponent {

  paciente?: Paciente | null;
  pacienteNombre: string | null = null; // Para saludar al usuario al inciciar sesión


  constructor(
    private _autService: AuthService,
    private router: Router) {
    this._autService.paciente.subscribe(paciente => {
      this.paciente = paciente;
      // Actualizar el nombre del usuario después de iniciar sesión
      this.pacienteNombre = paciente?.nombre || null;
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

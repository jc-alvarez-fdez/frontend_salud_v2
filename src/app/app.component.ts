import { HttpClientModule } from '@angular/common/http'; //Este módulo permite a la aplicación realizar solicitudes HTTP a un servidor back-end para obtener o enviar datos de pacientes.
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CabeceraComponent } from './shared/cabecera/cabecera.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/account/login/login.component';
import { RegisterComponent } from './components/account/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { Paciente } from './core/interfaces/paciente.interface';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterLink,
    RouterModule,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CabeceraComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'Control de medicación';

  paciente?: Paciente | null;
  pacienteNombre: string | null = null; // Para saludar al paciente al inciciar sesión

  constructor(
    private _authService: AuthService,
    private router: Router) {
    this._authService.paciente.subscribe(paciente => {
      this.paciente = paciente;
      // Actualizar el nombre del usuario después de iniciar sesión
      this.pacienteNombre = paciente?.nombre || null;
    });
  }

    logOut() {
        this._authService.logOut();
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

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './cabecera.component.html',
  styleUrl: './cabecera.component.scss'
})
export class CabeceraComponent {

  paciente: any;





getPacienteNombre(): string {
throw new Error('Method not implemented.');
}
toggleLogin() {
throw new Error('Method not implemented.');
}

}

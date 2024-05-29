import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Paciente } from '../../../core/interfaces/paciente.interface';
import { PacienteService } from '../../../core/services/paciente.service';
import { ProgressComponent } from '../../../shared/progress/progress.component';
import { StorageService } from '../../../core/services/storage.service';
import { AuthService } from '../../../core/services/auth.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-mis-datos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    ProgressComponent
  ],
  templateUrl: './mis-datos.component.html',
  styleUrl: './mis-datos.component.scss'
})
export class MisDatosComponent implements OnInit {

  formPaciente: FormGroup; // Formulario reactivo
  loading: boolean = false; // Indicador de carga
  operacion: string = "Editar"; // Operación actual (añadir o editar)
  error?: string;
  success?: string;
  paciente!: Paciente;
  pacienteId: number = 0; // Inicializar pacienteId con un valor predeterminado

  constructor(
    private fb: FormBuilder, // Servicio para construir formularios
    private _pacienteService: PacienteService, // Servicio para manejar datos de pacientes
    private router: Router, // Router para navegación
    private toastr: ToastrService, // Servicio para mostrar mensajes
    private activatedRoute: ActivatedRoute, // Para obtener parámetros de ruta
    private _storageService: StorageService,
    private _authService: AuthService
  ) {
    // Inicializar el formulario con los campos y validadores requeridos
    this.formPaciente = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      dni: ['', Validators.required],
      telefono: ['', Validators.required],
      domicilio: ['', Validators.required],
      cp: ['', Validators.required],
      poblacion: ['', Validators.required],
      provincia: ['', Validators.required],
    });

     // Verifica si el usuario está autenticado
     if (!this._storageService.isLoggedIn()) {
      // Si el usuario no está autenticado, redirige a la página de inicio de sesión
      this.router.navigate(['/login']);
      return;
    }


    // Obtener el paciente del storage
    this.paciente = this._storageService.getPaciente();


    // Verificar si el paciente está definido antes de asignar el id
    if (this.paciente && this.paciente.id_paciente !== undefined) {
      this.pacienteId = this.paciente.id_paciente;
    }
    console.log('id del paciente en el storage_service desde misdatos: ', this.pacienteId);

    // Obtener el ID del paciente desde la URL (si es necesario)
    // this.id = Number (activatedRoute.snapshot.paramMap.get('id'));
    // console.log(`ID: ${this.id}`);
  }

  ngOnInit(): void {
    if (this.pacienteId !== 0) {
      this.operacion = 'Editar';
      // Llama a getPaciente después de que el formulario se haya inicializado
      this.formPaciente.reset(); // Reiniciar el formulario para evitar el error NG01002
      this.getPaciente(this.pacienteId);
    }
  }

  addPaciente() {
    if (!this.formPaciente.valid) {
      return;
    }

    const paciente: Paciente = {
      id_paciente: this.pacienteId,
      nombre: this.formPaciente.value.nombre,
      apellidos: this.formPaciente.value.apellidos,
      fecha_nacimiento: this.formPaciente.value.fecha_nacimiento,
      dni: this.formPaciente.value.dni,
      telefono: this.formPaciente.value.telefono,
      domicilio: this.formPaciente.value.domicilio,
      cp: this.formPaciente.value.cp,
      poblacion: this.formPaciente.value.poblacion,
      provincia: this.formPaciente.value.provincia,
    };

    this.loading = true;

    this._pacienteService.updatePaciente(this.pacienteId, paciente).subscribe({
      next: () => {
        this.loading = false;
        this.toastr.info(`El paciente ${paciente.nombre} se ha actualizado`, 'Actualizar paciente');
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.loading = false;
        this.error = 'Error al actualizar el paciente';
        console.error(error);
      },
      complete: () => {
        console.log('Paciente actualizado correctamente.');
      }
    });
  }

    // Si hay un ID, estamos en modo edición (cambio esta version)
    /* if (this.pacienteId !== 0) {
      paciente.id_paciente = this.pacienteId;
      this._pacienteService.updatePaciente(this.pacienteId, paciente).subscribe(() => {
        this.loading = false;
        this.toastr.info(`El paciente ${paciente.nombre} se ha actualizado`, 'Actualizar paciente');
        this.router.navigate(['/home']);
      });
    }
    else {
      // Si no hay ID, estamos en modo añadir
      this._pacienteService.savePaciente(paciente).subscribe(() => {
        this.toastr.success(`El paciente ${paciente.nombre} se ha añadido`, 'Nuevo paciente');
        this.loading = false;
        this.router.navigate(['/listado-pacientes']);
      });
    }
  }
  */

  getPaciente(pacienteId: number) {
    this.loading = true;
    this._pacienteService.getPaciente(pacienteId).subscribe((data: Paciente) => {
      console.log(data);
      this.loading = false;
      this.formPaciente.patchValue({
            nombre: data.nombre ?? '',
            apellidos: data.apellidos ?? '',
            fecha_nacimiento: data.fecha_nacimiento ?? '',
            dni: data.dni ?? '',
            telefono: data.telefono ?? '',
            domicilio: data.domicilio ?? '',
            cp: data.cp ?? '',
            poblacion: data.poblacion ?? '',
            provincia: data.provincia ?? '',
          })
    });
  }
}

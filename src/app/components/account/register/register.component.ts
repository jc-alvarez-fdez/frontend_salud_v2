import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink, RouterModule } from '@angular/router';


import { HttpErrorResponse } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule, FormControl } from '@angular/forms';

//import { ToastrService } from 'ngx-toastr';
import { Paciente } from '../../../core/interfaces/paciente.interface';
//import { ErrorService } from '../../../core/services/error.service';
import { AuthService } from '../../../core/services/auth.service';
import { first } from 'rxjs';

//import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
//import { StorageService } from '../../../core/services/storage.service';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLink
    //SpinnerComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  formulario!: FormGroup;
  loading = false;
  submitted = false;
  error?: string;
  success?: string;

  constructor(
    private fb: FormBuilder, // Para crear el formulario de registro
    private router: Router, // Permite navegar a otras rutas en la aplicación
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Getter para un fácil acceso a los campos del formulario
  get f() { return this.formulario.controls; }

  onSubmit() {
    this.submitted = true; // Para indicar que el formulario se ha enviado

    // Reset alert on submit
    this.error = '';
    this.success = '';

    // Stop here if form is invalid
    if (this.formulario.invalid) {
      return;
    }

    this.loading = true;
    this.authService.register(this.formulario.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.success = 'Registro exitoso';
          this.router.navigate(['/login'], { queryParams: { registered: true } });
        },
        error: error => {
          this.error = error;
          this.loading = false;
        }
      });
  }
}




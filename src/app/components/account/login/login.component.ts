import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { first } from 'rxjs';

import { AuthService } from '../../../core/services/auth.service';
import { StorageService } from '../../../core/services/storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  formulario!: FormGroup;
  loading = false;
  submitted = false;
  error?: string;
  success?: string;



  constructor(
    private fb: FormBuilder, // para crear el formulario de inicio de sesión
    private route: ActivatedRoute, // Permite acceder a los parámetros de la ruta actual
    private router: Router, // Permite navegar a otras rutas en la aplicación.
    private _authService: AuthService,
    private _storageService: StorageService
  ) {
      // verifica si el usuario ya ha iniciado sesión y lo redirige a la página de inicio si es así
      if (this._authService.pacienteValue) {
        this.router.navigate(['/']);
    }

    }

  ngOnInit(): void {
  this.formulario = this.fb.group ({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    // Muestra un mensaje de éxito
    if (this.route.snapshot.queryParams['registered']) {
      this.success = 'Se ha registrado correctamente';
    }
  }

    // getter para un fácil acceso a los campos del formulario
    get f() { return this.formulario.controls; }


 onSubmit() {
      this.submitted = true; //para indicar que el formulario se ha enviado

      // reset alert on submit
      this.error = '';
      this.success = '';

      // stop here if form is invalid
      if (this.formulario.invalid) {
          return;
      }

    this.loading = true;
    this._authService.login(this.f['email'].value, this.f['password'].value)
      .pipe(first())
      .subscribe({
        next: () => {
          // Get return url from query parameters or default to home page
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
        error: error => {
          this.error = error;
          this.loading = false;
        }
      });
  }

      reloadPage(): void {
        window.location.reload();
      }

  }


  /* async onSubmit(): Promise<void> {
    try {
      const response = await this._authService.login(this.formulario.value);
      this._storageService.saveUser(response);

      this.isLoginFailed = false;
      this.isLoggedIn = true;
      this.roles = this._storageService.getUser().roles;
      this.reloadPage();
      console.log('logado');
    } catch (error: any) {
      this.errorMessage = error.error.message;
      this.isLoginFailed = true;
    }
  } */



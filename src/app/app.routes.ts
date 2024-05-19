import { Routes } from '@angular/router';
import { LoginComponent } from './components/account/login/login.component';
import { RegisterComponent } from './components/account/register/register.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'obten_medicacion', component: HomeComponent },
  { path: 'mis_medicamentos', component: HomeComponent },
  { path: 'estadisticas', component: HomeComponent },


];

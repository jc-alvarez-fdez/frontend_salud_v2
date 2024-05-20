import { Routes } from '@angular/router';
import { LoginComponent } from './components/account/login/login.component';
import { RegisterComponent } from './components/account/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { ObtenMedicacionComponent } from './pages/obten_medicacion/obten_medicacion.component';
import { MisMedicamentosComponent } from './pages/mis-medicamentos/mis-medicamentos.component';
import { EstadisticasComponent } from './pages/estadisticas/estadisticas.component';
import { AuthGuard } from './core/utils/guards/auth.guard';

export const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'obten_medicacion', component: ObtenMedicacionComponent, canActivate: [AuthGuard] },
  { path: 'mis_medicamentos', component: MisMedicamentosComponent, canActivate: [AuthGuard] },
  { path: 'estadisticas', component: EstadisticasComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' }

];

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './app/login/login.component';
import { EmpresasComponent } from './app/empresas/empresas.component';
import { IndexComponent } from './app/index/index.component';
import { ServiciosComponent } from './app/servicios/servicios.component';
import { InicioComponent } from './app/inicio/inicio.component';
import { RegisterComponent } from './app/login/register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'home', component: IndexComponent, children: [
      { path: 'inicio', component: InicioComponent },
      { path: 'empresas', component: EmpresasComponent },
      { path: 'servicios', component: ServiciosComponent },]
  },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

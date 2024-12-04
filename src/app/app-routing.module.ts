import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './app/login/login.component';
import { EmpresasComponent } from './app/empresas/empresas.component';
import { IndexComponent } from './app/index/index.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: IndexComponent },
  { path: 'empresas', component: EmpresasComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirigir a login por defecto
  { path: '**', redirectTo: '/login' }, // Redirigir a login para rutas no encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

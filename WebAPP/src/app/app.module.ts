import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmpresasComponent } from './app/empresas/empresas.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './app/login/login.component';
import { IndexComponent } from './app/index/index.component';
//Modulos de primeNG
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ServiciosComponent } from './app/servicios/servicios.component';

@NgModule({
  declarations: [
    AppComponent,
    EmpresasComponent,
    LoginComponent,
    IndexComponent,
    ServiciosComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ButtonModule,
    MenubarModule,
    DropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //Variables para montar la URL de la API
  private apiUrl = 'http://localhost:4000';
  private empresabyprovinciaUrl = '/empresa/getByProvincia/';
  private loginUrl = '/cliente/login';


  constructor(private http: HttpClient) { }

  // Métodos para obtener datos de la API

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl + this.loginUrl, { 'email': email, 'contraseña': password })

  }




  getDataEmpresasbyProvincia(provincia: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + this.empresabyprovinciaUrl + provincia);
  }


}

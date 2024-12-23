import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //Variables para montar la URL de la API
  private apiUrl = 'http://localhost:4000';
  private empresabyprovinciaUrl = '/empresa/getByProvincia/';
  private serviciosbyprovinciaUrl = '/servicios/getByProvincia/';
  private loginUrl = '/cliente/login';
  private clienteeliminarClienteandServiciosUrl = '/cliente/eliminarClienteandServicios';
  private serviciosbyclienteUrl = '/servicios/getByCliente';


  constructor(private http: HttpClient) { }

  // Métodos para obtener datos de la API

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl + this.loginUrl, { 'email': email, 'contraseña': password })

  }

  getDataEmpresasbyProvincia(provincia: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + this.empresabyprovinciaUrl + provincia);
  }

  getDataServiciosbyProvincia(provincia: string): Observable<any> {
    const params = new HttpParams().set('provincia', provincia);
    console.log(params);
    return this.http.get<any>(this.apiUrl + this.serviciosbyprovinciaUrl, { params });
  }

  getDataServiciosbycliente(id_cliente: number): Observable<any> {
    const params = new HttpParams().set('id_cliente', id_cliente);
    console.log(params);
    return this.http.get<any>(this.apiUrl + this.serviciosbyclienteUrl, { params });

  }
  EliminarServiciosDeCliente(id_cliente: string, id_servicio_empresa: string): Observable<any> {
    const params = new HttpParams()
      .append('id_cliente', id_cliente)
      .append('id_servicio_empresa', id_servicio_empresa);
    console.log(params);
    return this.http.get<any>(this.apiUrl + this.clienteeliminarClienteandServiciosUrl, { params });
  }


}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //Variables para montar la URL de la API
  private apiUrl = 'https://aplicacionweb-nodejs.onrender.com';
  //EmpresasApiURL
  private empresabyprovinciaUrl = '/empresa/getByProvincia/';

  //ClienteApiURL
  private loginUrl = '/cliente/login';
  private clienteCrearNuevoClienteUrl = '/cliente/register';
  private clienteeliminarClienteandServiciosUrl = '/cliente/eliminarClienteandServicios';
  private clienteCrearClienteandServiciosUrl = '/cliente/crearClienteandServicios';

  //ServiciosApiURL
  private serviciosbyprovinciaUrl = '/servicios/getByProvincia/';
  private serviciosbyclienteUrl = '/servicios/getByCliente';

  constructor(private http: HttpClient) { }

  //Metodo para agregar el token en los encabezados
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  // Métodos para obtener datos de la API

  nuevoUsuario(nombre: string, email: string, contraseña: string, direccion: string, provincia: string): Observable<any> {
    const params = new HttpParams()
      .set('nombre', nombre)
      .set('email', email)
      .set('contraseña', contraseña)
      .set('direccion', direccion)
      .set('provincia', provincia);

    console.log(params);

    return this.http.post<any>(this.apiUrl + this.clienteCrearNuevoClienteUrl, params, { observe: 'response' });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl + this.loginUrl, { 'email': email, 'contraseña': password })
  }

  getDataEmpresasbyProvincia(provincia: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + this.empresabyprovinciaUrl + provincia, {
      headers: this.getHeaders(),
    });
  }

  getDataServiciosbyProvincia(provincia: string): Observable<any> {
    const params = new HttpParams().set('provincia', provincia);
    console.log(params);
    return this.http.get<any>(this.apiUrl + this.serviciosbyprovinciaUrl, {
      headers: this.getHeaders(),
      params,
    });
  }

  // Obtener servicios de un cliente

  getDataServiciosbycliente(id_cliente: number): Observable<any> {
    const params = new HttpParams().set('id_cliente', id_cliente);
    console.log(params);
    return this.http.get<any>(this.apiUrl + this.serviciosbyclienteUrl, {
      headers: this.getHeaders(),
      params,
    });

  }
  // Eliminar servicios de un cliente
  EliminarServiciosDeCliente(id_cliente: number, id_servicio_empresa: number): Observable<any> {
    const params = new HttpParams()
      .set('id_cliente', id_cliente.toString())
      .set('id_servicio_empresa', id_servicio_empresa.toString());

    console.log(params);
    return this.http.delete<any>(this.apiUrl + this.clienteeliminarClienteandServiciosUrl, {
      headers: this.getHeaders(),
      params,
      observe: 'response'
    });
  }
  crearClienteyServicios(id_servicio_empresa: string, id_cliente: number, preciocontrat: number): Observable<any> {
    const params = {
      id_cliente: id_cliente,
      id_servicio_empresa: id_servicio_empresa,
      preciocontrat: preciocontrat,
    }

    console.log(params)

    return this.http.post<any>(this.apiUrl + this.clienteCrearClienteandServiciosUrl, params, { headers: this.getHeaders(), observe: 'response' });
  }
}

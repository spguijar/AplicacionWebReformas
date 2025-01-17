import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { cliente } from '../interfaces/cliente.interface';
import { dataCliente } from '../app/utils';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private sharedCliente = new BehaviorSubject<cliente>(dataCliente); // Iniciar con un valor vacío o alguno por defecto
  public sharedCliente$ = this.sharedCliente.asObservable(); // Observable para suscribirse al valor


  constructor() { }

  setSharedData(data: cliente) {
    this.sharedCliente.next(data);
  }
}

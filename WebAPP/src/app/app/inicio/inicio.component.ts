import { Component, OnInit } from '@angular/core';
import { cliente } from 'src/app/interfaces/cliente.interface';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { dataCliente } from '../utils';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public infoCliente: cliente = dataCliente;


  constructor(private sharedDataService: SharedDataService) { }

  ngOnInit() {
    this.sharedDataService.sharedCliente$.subscribe(cliente => {
      this.infoCliente = cliente;
    })

  }
}

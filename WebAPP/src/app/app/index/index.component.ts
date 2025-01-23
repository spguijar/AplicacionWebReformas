import { Component, Input, OnInit } from '@angular/core';
import { SharedDataService } from '../../services/shared-data.service'
import { cliente } from 'src/app/interfaces/cliente.interface';
import { Router, RouterLink } from '@angular/router';
import { dataCliente } from '../utils';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  public infoCliente: cliente = dataCliente;
  items: any[];

  constructor(private sharedDataService: SharedDataService, private router: Router) {
    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-home',
        command: () => { this.goToHome(); }
      },
      {
        label: 'Servicios',
        icon: 'pi pi-shopping-cart',
        command: () => { this.goToServices(); }
      },
      {
        label: 'Empresas',
        icon: 'pi pi-building',
        command: () => { this.goToCompany(); }
      },
      {
        label: 'Opciones',
        icon: 'pi pi-cog',
        items: [
          {
            label: 'Cerrar sesión',
            icon: 'pi pi-sign-out',
            command: () => { this.logout(); }
          }
        ]
      }
    ];
  }

  ngOnInit() {
    this.sharedDataService.sharedCliente$.subscribe(cliente => {
      this.infoCliente = cliente;
    })

  }
  goToHome() {
    // Navegar a la página de inicio
    this.router.navigate(['/home/inicio'])
  }

  goToServices() {
    // Navegar a la página de servicios
    this.router.navigate(['/home/servicios'])
  }
  goToCompany() {
    this.router.navigate(['/home/empresas'])
  }

  logout() {
    // Lógica para cerrar sesión
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}

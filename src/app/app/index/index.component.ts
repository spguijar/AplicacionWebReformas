import { Component, Input, OnInit } from '@angular/core';
import { SharedDataService } from '../../services/shared-data.service'
import { cliente } from 'src/app/interfaces/cliente.interface';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  public infoCliente: cliente = {
    nombre: "",
    provincia: "",
    direccion: ""
  };
  items: any[];

  constructor(private sharedDataService: SharedDataService, private router: Router) {
    this.items = [
      {
        label: 'Inicio',
        //icon: 'pi pi-home',
        command: () => { this.goToHome(); }
      },
      {
        label: 'Servicios',
        icon: 'pi pi-shopping-cart',
        command: () => { this.goToServices(); }
      },
      {
        label: 'Empresas',
        icon: 'pi pi-shopping-cart',
        RouterLink: ['/empresas'],
        // command: () => { this.goToCompany(); }
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
    console.log('Ir a Inicio');
  }

  goToServices() {
    // Navegar a la página de servicios
    console.log('Ir a servicios');
  }
  goToCompany() {
    console.log('Ir a empresas');
    this.router.navigate(['/empresas'])
  }

  logout() {
    // Lógica para cerrar sesión
    console.log('Cerrar sesión');
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}

import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { provincias } from '../../utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  name: string = '';
  email: string = '';
  password: string = '';
  address: string = '';
  province: any = null;
  provinces = provincias;

  constructor(private messageService: MessageService) {

  }

  register() {
    if (this.name && this.email && this.password && this.address && this.province) {
      // Simula un registro exitoso
      this.messageService.add({ severity: 'success', summary: '¡Registro exitoso!', detail: 'Te has registrado correctamente.' });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor, completa todos los campos.' });
    }
  }

}

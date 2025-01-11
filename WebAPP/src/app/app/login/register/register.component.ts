import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { provincias } from '../../utils';
import { firstValueFrom } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

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

  constructor(private messageService: MessageService, private apiService: ApiService, private router: Router) {

  }

  async register() {
    if (this.name && this.email && this.password && this.address && this.province) {
      const response = await firstValueFrom(this.apiService.nuevoUsuario(this.name, this.email, this.password, this.address, this.province.name));
      if (response.status === 201) {
        console.log('Eliminación exitosa:', response.message || response);
        this.messageService.add({
          severity: 'success',
          summary: ' Registro con éxito',
          detail: 'Te has registrado correctamente.',
        });
        this.router.navigate(['/login']);
      } else {
        console.log('Respuesta no esperada:', response);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Ocurrió un problema al crear el registro. Inténtalo nuevamente.',
        });
      }

    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor, completa todos los campos.' });
    }
  }

}

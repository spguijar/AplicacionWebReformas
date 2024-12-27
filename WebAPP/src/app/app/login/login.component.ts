import { Component, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  private unsubscribe$ = new Subject<void>();

  constructor(private apiService: ApiService, private router: Router, private sharedDataService: SharedDataService, private messageService: MessageService) { }
  login(): void {
    console.log(this.email, this.password)
    this.apiService.login(this.email, this.password)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        response => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/home/inicio']);
          this.sharedDataService.setSharedData(response);
          console.log('Login exitoso');
        }, error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Credenciales incorrectas',
          });
        });
  }
}

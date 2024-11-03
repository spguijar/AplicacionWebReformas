import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {
  data: any;
  private provincia = 'Valladolid';
  private unsubscribe$ = new Subject<void>();

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getDataEmpresasbyProvincia(this.provincia)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        response => this.data = { ...response["empresas"] },
        error => console.error('Error al obtener los datos:', error)
      );
  }
}

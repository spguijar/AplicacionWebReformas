import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { cliente } from 'src/app/interfaces/cliente.interface';
import { dataCliente } from '../utils';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit, AfterViewInit {
  data: any;
  public infoCliente: cliente = dataCliente;
  public empresas: any
  circleStyles: any[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(private apiService: ApiService, private sharedDataService: SharedDataService) { }

  ngOnInit(): void {
    this.sharedDataService.sharedCliente$.subscribe(cliente => {
      this.infoCliente = cliente;
    })




    // console.log(this.data);
    // const nombres = Object.values(this.data).map((item: any) => { item.nombre });
    // console.log(nombres)
  }
  ngAfterViewInit(): void {
    this.apiService.getDataEmpresasbyProvincia(this.infoCliente.provincia)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        response => {
          this.data = { ...response["empresas"] }
          this.empresas = Object.values(this.data).map(item => (item as any).nombre);
          this.circleStyles = this.empresas.map(() => {
            return {
              top: this.getRandomPosition(80) + '%', // Top aleatorio
              left: this.getRandomPosition(80) + '%', // Left aleatorio
              backgroundColor: this.getRandomColor() // Color aleatorio
            };
          });
        },
        error => console.error('Error al obtener los datos:', error)
      );


  }

  getRandomPosition(max: number): number {
    return Math.floor(Math.random() * max);
  }

  getRandomColor(): string {
    const colors = ['#F98404', '#F9B208'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}

import { Component, OnInit } from '@angular/core';
import { cliente } from 'src/app/interfaces/cliente.interface';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { dataCliente } from '../utils';
import { ApiService } from 'src/app/services/api.service';
import { Subject, takeUntil } from 'rxjs';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
  data: any;
  serviciosbyCliente: any;
  public infoCliente: cliente = dataCliente;
  tareas: any[] = []; // Array para almacenar las tareas procesadas
  selectedTarea: any; // Variable para la tarea seleccionada
  horas: number = 0; // Campo para almacenar las horas imputadas
  tareasClientes: string[] = [];
  ;
  public provinciaCliente: string = '';
  public id_cliente: number = 0;
  private unsubscribe$ = new Subject<void>();

  constructor(private sharedDataService: SharedDataService, private apiService: ApiService, private confirmationService: ConfirmationService) {


  }

  ngOnInit(): void {
    this.sharedDataService.sharedCliente$.subscribe(cliente => {
      this.infoCliente = cliente;
      this.provinciaCliente = cliente.provincia;
      this.id_cliente = cliente.id_cliente;

    })
    this.subscribegetServiciosbyProvincia(this.provinciaCliente);
    this.subscribegetDataServiciosbycliente(this.id_cliente);
  }

  subscribegetServiciosbyProvincia(provinciaCliente: string) {

    console.log(provinciaCliente);
    this.apiService.getDataServiciosbyProvincia(provinciaCliente)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        response => {
          this.data = {
            ...response["servicios"]//.map((servicio: any) => {
            //   return {
            //     tarea: servicio.tarea,
            //     preciohora: servicio.Empresas[0].preciohora // Suponiendo que siempre hay al menos una empresa
            //   };
            //})
          };
          console.log('data', this.data);

          this.tareas = Object.keys(this.data).map((key) => ({
            label: this.data[key].tarea, // Lo que se muestra en el dropdown
            value: key                  // Valor único
          }));

        },
        error => console.error('Error al obtener los datos:', error)
      );
  }

  subscribegetDataServiciosbycliente(id_cliente: number) {
    this.apiService.getDataServiciosbycliente(id_cliente)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        response => {
          this.serviciosbyCliente = {
            ...response["servicios"]["0"].Servicios_Empresas
          };
          console.log(this.serviciosbyCliente);
          this.tareasClientes = ['fontaneria', 'grifos', 'pintura']
        }, error => console.error('Error al obtener los datos:', error)
      )
  }


  onSubmit() {
    console.log(`Tarea seleccionada: ${this.selectedTarea}`);
    console.log(`Horas imputadas: ${this.horas}`);
  }

  confirmBorradoServicio(index: number) {
    console.log('confirmdelete....');

    //Mensaje de dialogo de borrado del servicio
    this.confirmationService.confirm({
      message: '¿Seguro que deseas borrar el servicio seleccionado?',
      header: 'Confirmación de Borrado',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: () => {
        // Acción a realizar si el usuario acepta
        console.log('Servicio borrado');
        this.tareasClientes.splice(index, 1); // Elimina la tarea por índice
      },
      reject: () => {
        // Acción a realizar si el usuario rechaza
        console.log('Borrado cancelado');
      }
    });
  }


}
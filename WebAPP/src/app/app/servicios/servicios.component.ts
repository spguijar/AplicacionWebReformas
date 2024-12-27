import { Component, OnInit } from '@angular/core';
import { cliente } from 'src/app/interfaces/cliente.interface';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { dataCliente } from '../utils';
import { ApiService } from 'src/app/services/api.service';
import { Subject, takeUntil } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';

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
  presupuesto: number = 0;

  public provinciaCliente: string = '';
  public id_cliente: number = 0;
  private unsubscribe$ = new Subject<void>();

  constructor(private sharedDataService: SharedDataService, private apiService: ApiService, private confirmationService: ConfirmationService, private messageService: MessageService) {


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
          console.log(Object.keys(this.data).map((key) => this.data[key].Empresas[0].nombre));

          this.tareas = Object.keys(this.data).map((key) => ({
            label: this.data[key].tarea + ' - ' + this.data[key].Empresas[0].nombre, // Lo que se muestra en el dropdown
            value: this.data[key].Empresas[0].Servicios_Empresa.id                  // Valor único
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

  calcularPresupuesto(): void {
    this.presupuesto = this.getPresupuesto(this.data, this.selectedTarea, this.horas);
  }

  getPresupuesto(data: any, selectedTarea: string, horas: number): number {
    console.log(data, selectedTarea, horas);
    //Condicional si en el caso de que una tarea o las horas son inválidas, retorna 0
    if ((selectedTarea === '') || (horas <= 0)) {

      return 0;
    }
    console.log(Object.values(data))
    const tareaEncontrada = Object.values(data).find(
      (item: any) => item.Empresas[0].Servicios_Empresa.id === selectedTarea
    );

    if (tareaEncontrada) {
      // Obtén el precio por hora de la primera empresa asociada a la tarea
      const precioHora = (tareaEncontrada as any).Empresas[0]?.preciohora;

      // Calcula y retorna el presupuesto
      return precioHora * horas;
    }

    return 0; // Si no se encuentra la tarea, retorna 0
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

  confirmCreacionServicio() {
    if (this.selectedTarea && this.presupuesto) {
      //Mensaje de dialogo de borrado del servicio
      this.confirmationService.confirm({
        message: `¿Seguro que deseaa contratar el servicio por ${this.presupuesto} €?`,
        header: 'Confirmación de creación del servicio',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sí',
        rejectLabel: 'No',
        accept: () => {
          // Acción a realizar si el usuario acepta
          console.log('Servicio creado');
          this.subscribecrearClienteyServicios(this.selectedTarea, this.id_cliente, this.presupuesto)
            .then(status => {
              console.log('Status recibido:', status);
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Servicio contratado correctamente',
              });
            })
            .catch(errorStatus => {
              console.error('Status de error recibido:', errorStatus);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Ocurrió un problema al contratar el servicio',
              });
            });
        },
        reject: () => {
          // Acción a realizar si el usuario rechaza
          console.log('Borrado cancelado');
        }

      });
    }
  }
  subscribecrearClienteyServicios(id_servicio_empresa: string, id_cliente: number, preciocontrat: number): Promise<number> {
    return new Promise((resolve, reject) => {
      this.apiService.crearClienteyServicios(id_servicio_empresa, id_cliente, preciocontrat)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          response => {
            console.log(response);
            console.log(response.status)
            resolve(response.status);
          },
          error => {
            console.error('Error completo:', error);
            console.error('Status de error:', error.status);
            reject(error.status); // Rechazamos el status en caso de error
          }
        );
    });
  }
}
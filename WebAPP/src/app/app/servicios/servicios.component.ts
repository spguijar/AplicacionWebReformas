import { Component, OnInit } from '@angular/core';
import { cliente } from 'src/app/interfaces/cliente.interface';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { dataCliente } from '../utils';
import { ApiService } from 'src/app/services/api.service';
import { firstValueFrom, Subject, takeUntil } from 'rxjs';
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
  selectedServicio: any = null;
  horas: number = 0; // Campo para almacenar las horas imputadas
  tareasClientes: {
    id_servicio_empresa: number;
    preciocontrat: string;
    tarea: string;
  }[] = [];
  presupuesto: number = 0;
  comentario: string = '';

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
    this.apiService.getDataServiciosbyProvincia(provinciaCliente)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        response => {
          this.data = {
            ...response["servicios"]
          };

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
            ...response["servicios"]
          };
          this.tareasClientes = Object.values(this.serviciosbyCliente).flatMap((cliente: any) =>
            cliente.Servicios_Empresas.map((empresa: any) => ({
              id_servicio_empresa: empresa.Clientes_Servicios_Empresa.id_servicio_empre,
              preciocontrat: empresa.Clientes_Servicios_Empresa.preciocontrat,
              tarea: empresa.Servicio.tarea,
              fecha: empresa.Clientes_Servicios_Empresa.fechamodif,
              comentarios: empresa.Clientes_Servicios_Empresa.comentarios
            }))
          );
        }, error => console.error('Error al obtener los datos:', error)
      )
  }

  onRowSelect(event: any) {
    this.selectedServicio = event.data;
  }
  onRowUnselect() {
    this.selectedServicio = null;
  }

  guardarComentario() {
    if (this.selectedServicio) {
      this.subscribeActualizaComentarioClienteyServicio(this.selectedServicio.id_servicio_empresa, this.id_cliente, this.comentario)
        .then(status => {
          this.subscribegetDataServiciosbycliente(this.id_cliente);
          this.messageServiceCorrecto();
          this.comentario = '';
        })
        .catch(errorStatus => {
          console.error('Status de error recibido:', errorStatus);
          this.messageServiceError();
        });
    }
  }


  calcularPresupuesto(): void {
    this.presupuesto = this.getPresupuesto(this.data, this.selectedTarea, this.horas);
  }

  getPresupuesto(data: any, selectedTarea: string, horas: number): number {
    //Condicional si en el caso de que una tarea o las horas son inválidas, retorna 0
    if ((selectedTarea === '') || (horas <= 0)) {

      return 0;
    }
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
  messageServiceCorrecto() {
    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Cambio realizado correctamente',
    });
  }

  messageServiceError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Ocurrió un problema.Intentelo de nuevo',
    });
  }

  confirmBorradoServicio(id_servicio_empresa: number) {
    //Mensaje de dialogo de borrado del servicio
    this.confirmationService.confirm({
      message: '¿Seguro que deseas borrar el servicio seleccionado?',
      header: 'Confirmación de Borrado',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: async () => {
        // Acción a realizar si el usuario acepta
        try {
          const response = await firstValueFrom(this.apiService.EliminarServiciosDeCliente(this.id_cliente, id_servicio_empresa));
          // Verificar si el status es 200
          if (response.status === 200) {
            this.messageServiceCorrecto();
            this.subscribegetDataServiciosbycliente(this.id_cliente);

          } else {
            this.messageServiceError();

          }
        } catch (error) {
          this.messageServiceError();
        } finally {
        }



      },
      reject: () => {
        // Acción a realizar si el usuario rechaza

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
          this.subscribecrearClienteyServicios(this.selectedTarea, this.id_cliente, this.presupuesto)
            .then(status => {
              this.subscribegetDataServiciosbycliente(this.id_cliente);
              this.messageServiceCorrecto();
            })
            .catch(errorStatus => {
              this.messageServiceError();
            });
        },
        reject: () => {
          // Acción a realizar si el usuario rechaza
        }

      });
    }
  }

  subscribeEliminarServiciosDeCliente(id_cliente: number, id_servicio_empresa: number): Promise<number> {
    return new Promise((resolve, reject) => {
      this.apiService.EliminarServiciosDeCliente(this.id_cliente, id_servicio_empresa)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          response => {
            resolve(response.status);
          },
          error => {
            reject(error.status); // Rechazamos el status en caso de error
          }
        );
    })
  }

  subscribecrearClienteyServicios(id_servicio_empresa: string, id_cliente: number, preciocontrat: number): Promise<number> {
    return new Promise((resolve, reject) => {
      this.apiService.crearClienteyServicios(id_servicio_empresa, id_cliente, preciocontrat)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          response => {
            resolve(response.status);
          },
          error => {
            reject(error.status); // Rechazamos el status en caso de error
          }
        );
    });
  }

  subscribeActualizaComentarioClienteyServicio(id_servicio_empresa: string, id_cliente: number, comentario: string): Promise<number> {

    return new Promise((resolve, reject) => {
      this.apiService.actualizaComentarioClienteyServicio(id_servicio_empresa, id_cliente, comentario)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          response => {
            resolve(response.status);
          },
          error => {
            reject(error.status); // Rechazamos el status en caso de error
          }
        );
    });
  }
}
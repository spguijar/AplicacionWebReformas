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
  horas: number = 0; // Campo para almacenar las horas imputadas
  tareasClientes: {
    id_servicio_empresa: number;
    preciocontrat: string;
    tarea: string;
  }[] = [];
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
            ...response["servicios"]
          };
          console.log(this.serviciosbyCliente);
          this.tareasClientes = Object.values(this.serviciosbyCliente).flatMap((cliente: any) =>
            cliente.Servicios_Empresas.map((empresa: any) => ({
              id_servicio_empresa: empresa.Clientes_Servicios_Empresa.id_servicio_empre,
              preciocontrat: empresa.Clientes_Servicios_Empresa.preciocontrat,
              tarea: empresa.Servicio.tarea
            }))
          );
          console.log(this.tareasClientes)
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
        console.log(this.tareasClientes);
        console.log(id_servicio_empresa);
        try {
          const response = await firstValueFrom(this.apiService.EliminarServiciosDeCliente(this.id_cliente, id_servicio_empresa));
          console.log('respuesta....', response);
          console.log('respuesta....', response.status);
          // Verificar si el status es 200
          if (response.status === 200) {
            console.log('Eliminación exitosa:', response.message || response);
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Servicio eliminado correctamente',
            });
            this.subscribegetDataServiciosbycliente(this.id_cliente);

          } else {
            console.log('Respuesta no esperada:', response);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Ocurrió un problema al eliminar el servicio. Inténtalo nuevamente.',
            });
          }
        } catch (error) {
          console.error('Error al eliminar el servicio:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Ocurrió un problema al eliminar el servicio. Inténtalo nuevamente.',
          });
        } finally {
          // Mensaje final cuando se completa la operación
          console.log('Operación finalizada.');
        }

        // this.subscribeEliminarServiciosDeCliente(this.id_cliente, id_servicio_empresa)
        //   .then(status => {
        //     this.subscribegetDataServiciosbycliente(this.id_cliente);
        //     this.messageService.add({
        //       severity: 'success',
        //       summary: 'Éxito',
        //       detail: 'Servicio eliminado correctamente',
        //     });
        //   })
        //   .catch(errorStatus => {
        //     console.error('Status de error recibido:', errorStatus);
        //     this.messageService.add({
        //       severity: 'error',
        //       summary: 'Error',
        //       detail: 'Ocurrió un problema al eliminar el servicio',
        //     });
        //   });

        // for (let i = this.tareasClientes.length - 1; i >= 0; i--) {
        //   if (this.tareasClientes[i].id_servicio_empresa === id_servicio_empresa) {
        //     this.tareasClientes.splice(i, 1);
        //   }
        // }

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
              this.subscribegetDataServiciosbycliente(this.id_cliente);
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

  subscribeEliminarServiciosDeCliente(id_cliente: number, id_servicio_empresa: number): Promise<number> {
    return new Promise((resolve, reject) => {
      this.apiService.EliminarServiciosDeCliente(this.id_cliente, id_servicio_empresa)
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
    })
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
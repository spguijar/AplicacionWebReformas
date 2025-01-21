import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ServiciosComponent } from './servicios.component';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { ApiService } from 'src/app/services/api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

describe('ServiciosComponent', () => {
  let component: ServiciosComponent;
  let fixture: ComponentFixture<ServiciosComponent>;
  let httpMock: HttpTestingController;
  let sharedDataService: SharedDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiciosComponent],
      imports: [
        HttpClientTestingModule,
        DropdownModule,
        FormsModule
      ],
      providers: [
        SharedDataService,
        ApiService,
        ConfirmationService,
        MessageService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController); // Inyectamos HttpTestingController
    sharedDataService = TestBed.inject(SharedDataService);

    // Simulamos el cliente compartido
    sharedDataService.setSharedData({
      provincia: 'Valladolid',
      id_cliente: 1,
      nombre: 'test',
      direccion: 'direcciontest'
    });

    // para disparar la función ngOnInit()
    fixture.detectChanges();
  });
  // Esto se ejecuta que no haya solicitudes pendientes
  afterEach(() => {
    httpMock.verify();
  });

  it('debería obtener los servicios por provincia', () => {
    // Configuramos el mock de la respuesta HTTP
    const mockResponse = {
      servicios: {
        tarea1: {
          tarea: 'Tarea 1',
          Empresas: [
            {
              nombre: 'Empresa 1',
              Servicios_Empresa: { id: 123 },
              preciohora: 50
            }
          ]
        }
      }
    };

    // Aseguramos que la solicitud HTTP sea enviada correctamente
    const req = httpMock.expectOne('http://localhost:4000/servicios/getByProvincia/?provincia=Valladolid');
    expect(req.request.method).toBe('GET'); // Aseguramos que el método sea GET
    req.flush(mockResponse); // Devolvemos el mock de la respuesta
  })
})

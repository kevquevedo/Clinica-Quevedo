import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoTurnosPacientesComponent } from './listado-turnos-pacientes.component';

describe('ListadoTurnosPacientesComponent', () => {
  let component: ListadoTurnosPacientesComponent;
  let fixture: ComponentFixture<ListadoTurnosPacientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoTurnosPacientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoTurnosPacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

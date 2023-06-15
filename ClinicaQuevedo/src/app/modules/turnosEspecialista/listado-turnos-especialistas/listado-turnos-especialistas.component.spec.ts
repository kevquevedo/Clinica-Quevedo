import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoTurnosEspecialistasComponent } from './listado-turnos-especialistas.component';

describe('ListadoTurnosEspecialistasComponent', () => {
  let component: ListadoTurnosEspecialistasComponent;
  let fixture: ComponentFixture<ListadoTurnosEspecialistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoTurnosEspecialistasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoTurnosEspecialistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

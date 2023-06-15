import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTurnosPacientesComponent } from './home-turnos-pacientes.component';

describe('HomeTurnosPacientesComponent', () => {
  let component: HomeTurnosPacientesComponent;
  let fixture: ComponentFixture<HomeTurnosPacientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeTurnosPacientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeTurnosPacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

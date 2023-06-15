import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleTurnoPacienteComponent } from './detalle-turno-paciente.component';

describe('DetalleTurnoPacienteComponent', () => {
  let component: DetalleTurnoPacienteComponent;
  let fixture: ComponentFixture<DetalleTurnoPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleTurnoPacienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleTurnoPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleTurnosEspecialistasComponent } from './detalle-turnos-especialistas.component';

describe('DetalleTurnosEspecialistasComponent', () => {
  let component: DetalleTurnosEspecialistasComponent;
  let fixture: ComponentFixture<DetalleTurnosEspecialistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleTurnosEspecialistasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleTurnosEspecialistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionPacientesHomeComponent } from './seccion-pacientes-home.component';

describe('SeccionPacientesHomeComponent', () => {
  let component: SeccionPacientesHomeComponent;
  let fixture: ComponentFixture<SeccionPacientesHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeccionPacientesHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeccionPacientesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

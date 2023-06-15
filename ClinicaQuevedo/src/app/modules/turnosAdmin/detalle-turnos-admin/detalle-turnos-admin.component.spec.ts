import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleTurnosAdminComponent } from './detalle-turnos-admin.component';

describe('DetalleTurnosAdminComponent', () => {
  let component: DetalleTurnosAdminComponent;
  let fixture: ComponentFixture<DetalleTurnosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleTurnosAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleTurnosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

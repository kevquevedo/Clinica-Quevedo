import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTurnosEspecialistasComponent } from './home-turnos-especialistas.component';

describe('HomeTurnosEspecialistasComponent', () => {
  let component: HomeTurnosEspecialistasComponent;
  let fixture: ComponentFixture<HomeTurnosEspecialistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeTurnosEspecialistasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeTurnosEspecialistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

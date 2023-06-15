import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSolicitarTurnoComponent } from './home-solicitar-turno.component';

describe('HomeSolicitarTurnoComponent', () => {
  let component: HomeSolicitarTurnoComponent;
  let fixture: ComponentFixture<HomeSolicitarTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeSolicitarTurnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeSolicitarTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

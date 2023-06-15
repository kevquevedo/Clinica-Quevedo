import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMiPerfilComponent } from './home-mi-perfil.component';

describe('HomeMiPerfilComponent', () => {
  let component: HomeMiPerfilComponent;
  let fixture: ComponentFixture<HomeMiPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeMiPerfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeMiPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

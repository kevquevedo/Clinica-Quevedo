import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionUsuariosHomeComponent } from './seccion-usuarios-home.component';

describe('SeccionUsuariosHomeComponent', () => {
  let component: SeccionUsuariosHomeComponent;
  let fixture: ComponentFixture<SeccionUsuariosHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeccionUsuariosHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeccionUsuariosHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

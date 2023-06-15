import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTurnosAdminComponent } from './home-turnos-admin.component';

describe('HomeTurnosAdminComponent', () => {
  let component: HomeTurnosAdminComponent;
  let fixture: ComponentFixture<HomeTurnosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeTurnosAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeTurnosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

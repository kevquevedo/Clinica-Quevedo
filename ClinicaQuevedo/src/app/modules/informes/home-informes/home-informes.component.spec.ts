import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeInformesComponent } from './home-informes.component';

describe('HomeInformesComponent', () => {
  let component: HomeInformesComponent;
  let fixture: ComponentFixture<HomeInformesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeInformesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeInformesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

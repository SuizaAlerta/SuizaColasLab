import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteMotosComponent } from './reporte-motos.component';

describe('ReporteMotosComponent', () => {
  let component: ReporteMotosComponent;
  let fixture: ComponentFixture<ReporteMotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteMotosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteMotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteCargaExitosaComponent } from './reporte-carga-exitosa.component';

describe('ReporteCargaExitosaComponent', () => {
  let component: ReporteCargaExitosaComponent;
  let fixture: ComponentFixture<ReporteCargaExitosaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteCargaExitosaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteCargaExitosaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportePilotoV2Component } from './reporte-piloto-v2.component';

describe('ReportePilotoV2Component', () => {
  let component: ReportePilotoV2Component;
  let fixture: ComponentFixture<ReportePilotoV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportePilotoV2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportePilotoV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

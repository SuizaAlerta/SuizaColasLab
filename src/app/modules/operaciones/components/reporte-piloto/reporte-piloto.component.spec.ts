import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportePilotoComponent } from './reporte-piloto.component';

describe('ReportePilotoComponent', () => {
  let component: ReportePilotoComponent;
  let fixture: ComponentFixture<ReportePilotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportePilotoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportePilotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

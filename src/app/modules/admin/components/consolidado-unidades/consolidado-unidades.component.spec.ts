import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidadoUnidadesComponent } from './consolidado-unidades.component';

describe('ConsolidadoUnidadesComponent', () => {
  let component: ConsolidadoUnidadesComponent;
  let fixture: ComponentFixture<ConsolidadoUnidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsolidadoUnidadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolidadoUnidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

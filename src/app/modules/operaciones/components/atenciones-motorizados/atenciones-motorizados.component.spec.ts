import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtencionesMotorizadosComponent } from './atenciones-motorizados.component';

describe('AtencionesMotorizadosComponent', () => {
  let component: AtencionesMotorizadosComponent;
  let fixture: ComponentFixture<AtencionesMotorizadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtencionesMotorizadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtencionesMotorizadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

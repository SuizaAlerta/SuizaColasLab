import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAtencionesComponent } from './lista-atenciones.component';

describe('ListaAtencionesComponent', () => {
  let component: ListaAtencionesComponent;
  let fixture: ComponentFixture<ListaAtencionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaAtencionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAtencionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

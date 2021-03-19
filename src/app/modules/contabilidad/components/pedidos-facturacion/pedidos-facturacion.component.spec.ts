import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosFacturacionComponent } from './pedidos-facturacion.component';

describe('PedidosFacturacionComponent', () => {
  let component: PedidosFacturacionComponent;
  let fixture: ComponentFixture<PedidosFacturacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidosFacturacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosFacturacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

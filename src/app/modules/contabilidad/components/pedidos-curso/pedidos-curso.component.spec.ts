import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosCursoComponent } from './pedidos-curso.component';

describe('PedidosCursoComponent', () => {
  let component: PedidosCursoComponent;
  let fixture: ComponentFixture<PedidosCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidosCursoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

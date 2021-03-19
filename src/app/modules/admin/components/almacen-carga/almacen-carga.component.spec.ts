import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmacenCargaComponent } from './almacen-carga.component';

describe('AlmacenCargaComponent', () => {
  let component: AlmacenCargaComponent;
  let fixture: ComponentFixture<AlmacenCargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlmacenCargaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlmacenCargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

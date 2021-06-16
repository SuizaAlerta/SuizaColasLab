import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoRegistrosComponent } from './listado-registros.component';

describe('ListadoRegistrosComponent', () => {
  let component: ListadoRegistrosComponent;
  let fixture: ComponentFixture<ListadoRegistrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoRegistrosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoRegistrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

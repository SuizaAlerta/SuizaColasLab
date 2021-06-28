import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaExitosaComponent } from './carga-exitosa.component';

describe('CargaExitosaComponent', () => {
  let component: CargaExitosaComponent;
  let fixture: ComponentFixture<CargaExitosaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargaExitosaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CargaExitosaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

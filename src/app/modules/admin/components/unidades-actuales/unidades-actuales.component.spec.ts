import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadesActualesComponent } from './unidades-actuales.component';

describe('UnidadesActualesComponent', () => {
  let component: UnidadesActualesComponent;
  let fixture: ComponentFixture<UnidadesActualesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnidadesActualesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadesActualesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

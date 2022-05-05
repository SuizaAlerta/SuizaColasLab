import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarAtencionComponent } from './asignar-atencion.component';

describe('AsignarAtencionComponent', () => {
  let component: AsignarAtencionComponent;
  let fixture: ComponentFixture<AsignarAtencionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarAtencionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarAtencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

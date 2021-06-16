import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaSintomatologiaComponent } from './ficha-sintomatologia.component';

describe('FichaSintomatologiaComponent', () => {
  let component: FichaSintomatologiaComponent;
  let fixture: ComponentFixture<FichaSintomatologiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaSintomatologiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaSintomatologiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

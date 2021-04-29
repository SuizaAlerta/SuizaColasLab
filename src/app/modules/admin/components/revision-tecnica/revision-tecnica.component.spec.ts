import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionTecnicaComponent } from './revision-tecnica.component';

describe('RevisionTecnicaComponent', () => {
  let component: RevisionTecnicaComponent;
  let fixture: ComponentFixture<RevisionTecnicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisionTecnicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisionTecnicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

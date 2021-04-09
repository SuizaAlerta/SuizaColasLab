import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasePersonalComponent } from './base-personal.component';

describe('BasePersonalComponent', () => {
  let component: BasePersonalComponent;
  let fixture: ComponentFixture<BasePersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasePersonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasePersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

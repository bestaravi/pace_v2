import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PunchForgotComponent } from './punch-forgot.component';

describe('PunchForgotComponent', () => {
  let component: PunchForgotComponent;
  let fixture: ComponentFixture<PunchForgotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PunchForgotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PunchForgotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwipeForgotComponent } from './swipe-forgot.component';

describe('SwipeForgotComponent', () => {
  let component: SwipeForgotComponent;
  let fixture: ComponentFixture<SwipeForgotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwipeForgotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwipeForgotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

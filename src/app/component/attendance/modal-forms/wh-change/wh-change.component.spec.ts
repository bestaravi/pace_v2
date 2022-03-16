import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhChangeComponent } from './wh-change.component';

describe('WhChangeComponent', () => {
  let component: WhChangeComponent;
  let fixture: ComponentFixture<WhChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhChangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorProductDisplayComponent } from './operator-product-display.component';

describe('OperatorProductDisplayComponent', () => {
  let component: OperatorProductDisplayComponent;
  let fixture: ComponentFixture<OperatorProductDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatorProductDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorProductDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

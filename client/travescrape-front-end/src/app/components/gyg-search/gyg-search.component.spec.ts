import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GygSearchComponent } from './gyg-search.component';

describe('GygSearchComponent', () => {
  let component: GygSearchComponent;
  let fixture: ComponentFixture<GygSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GygSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GygSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

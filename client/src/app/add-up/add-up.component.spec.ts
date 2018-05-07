import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpComponent } from './add-up.component';

describe('AddUpComponent', () => {
  let component: AddUpComponent;
  let fixture: ComponentFixture<AddUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

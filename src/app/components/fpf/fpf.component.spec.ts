import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FpfComponent } from './fpf.component';

describe('FpfComponent', () => {
  let component: FpfComponent;
  let fixture: ComponentFixture<FpfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FpfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FpfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZglFilterComponent } from './zgl-filter.component';

describe('ZglFilterComponent', () => {
  let component: ZglFilterComponent;
  let fixture: ComponentFixture<ZglFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZglFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZglFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

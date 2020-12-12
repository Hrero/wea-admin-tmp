import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanotfindComponent } from './canotfind.component';

describe('CanotfindComponent', () => {
  let component: CanotfindComponent;
  let fixture: ComponentFixture<CanotfindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanotfindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanotfindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

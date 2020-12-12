import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppViewImageComponent } from './app-view-image.component';

describe('AppViewImageComponent', () => {
  let component: AppViewImageComponent;
  let fixture: ComponentFixture<AppViewImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppViewImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppViewImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

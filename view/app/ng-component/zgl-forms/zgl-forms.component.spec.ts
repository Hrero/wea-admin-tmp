import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZglFormsComponent } from './zgl-forms.component';

describe('ZglFormsComponent', () => {
  let component: ZglFormsComponent;
  let fixture: ComponentFixture<ZglFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZglFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZglFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

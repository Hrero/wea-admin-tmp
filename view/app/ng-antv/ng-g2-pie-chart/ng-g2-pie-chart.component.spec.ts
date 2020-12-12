import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgG2PieChartComponent } from './ng-g2-pie-chart.component';

describe('NgG2PieChartComponent', () => {
  let component: NgG2PieChartComponent;
  let fixture: ComponentFixture<NgG2PieChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgG2PieChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgG2PieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

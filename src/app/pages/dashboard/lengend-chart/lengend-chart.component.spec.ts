import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LengendChartComponent } from './lengend-chart.component';

describe('LengendChartComponent', () => {
  let component: LengendChartComponent;
  let fixture: ComponentFixture<LengendChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LengendChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LengendChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

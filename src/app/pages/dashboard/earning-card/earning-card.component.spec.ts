import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarningCardComponent } from './earning-card.component';

describe('EarningCardComponent', () => {
  let component: EarningCardComponent;
  let fixture: ComponentFixture<EarningCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EarningCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EarningCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

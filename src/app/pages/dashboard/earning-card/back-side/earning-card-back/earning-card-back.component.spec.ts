import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarningCardBackComponent } from './earning-card-back.component';

describe('EarningCardBackComponent', () => {
  let component: EarningCardBackComponent;
  let fixture: ComponentFixture<EarningCardBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EarningCardBackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EarningCardBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

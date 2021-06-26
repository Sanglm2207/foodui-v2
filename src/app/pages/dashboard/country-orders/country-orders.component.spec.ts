import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryOrdersComponent } from './country-orders.component';

describe('CountryOrdersComponent', () => {
  let component: CountryOrdersComponent;
  let fixture: ComponentFixture<CountryOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

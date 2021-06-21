import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePostalComponent } from './delete-postal.component';

describe('DeletePostalComponent', () => {
  let component: DeletePostalComponent;
  let fixture: ComponentFixture<DeletePostalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePostalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePostalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

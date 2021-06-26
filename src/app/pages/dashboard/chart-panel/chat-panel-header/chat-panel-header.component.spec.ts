import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatPanelHeaderComponent } from './chat-panel-header.component';

describe('ChatPanelHeaderComponent', () => {
  let component: ChatPanelHeaderComponent;
  let fixture: ComponentFixture<ChatPanelHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatPanelHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatPanelHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

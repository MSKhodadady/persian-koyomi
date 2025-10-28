import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarPane } from './calendar-pane';

describe('CalendarPane', () => {
  let component: CalendarPane;
  let fixture: ComponentFixture<CalendarPane>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarPane]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarPane);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateCard } from './date-card';

describe('DateCard', () => {
  let component: DateCard;
  let fixture: ComponentFixture<DateCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

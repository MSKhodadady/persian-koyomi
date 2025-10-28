import { Component, inject, input, signal } from '@angular/core';
import { DateCard } from '../date-card/date-card';
import { PerDateGenerator } from '../per-date-generator';

@Component({
  selector: 'app-calendar-pane',
  imports: [DateCard],
  templateUrl: './calendar-pane.html',
  styleUrl: './calendar-pane.scss',
})
export class CalendarPane {
  dayGenerator = inject(PerDateGenerator);

  year = input<number>(0);
  month = input<number>(0);

  days = signal<DaySlotC[]>([]);

  ngOnInit() {
    const d = this.dayGenerator.getNow();

    d.setMonth(this.month());
    d.setYear(this.year());

    const currentMonth = this.dayGenerator
      .getPersianMonthDays(d.year, d.month.number)
      .map((i) => ({ ...i, currentMonth: true }));

    this.days.set(currentMonth);
  }
  getColStart(num: number) {
    return {
      'grid-column-start': num,
    };
  }
}

import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import DateObject from 'react-date-object';
import { WEEK_DAYS } from '../lib/constants';
import { DateCard } from './date-card/date-card';
import { PerDateGenerator } from './per-date-generator';
import { ToolBar } from './tool-bar/tool-bar';

@Component({
  selector: 'app-root',
  imports: [ToolBar, DateCard, MatButtonModule, MatDividerModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  dayGenerator = inject(PerDateGenerator);

  weekDays = WEEK_DAYS;

  title = signal('persian-koyomi');

  month = signal<{ name: string; number: number }>({ name: '', number: 0 });
  year = signal<number>(0);
  days = signal<DaySlotC[]>([]);

  setByDateObj(d: DateObject) {
    this.month.set(d.month);
    this.year.set(d.year);

    const currentMonth = this.dayGenerator
      .getPersianMonthDays(d.year, d.month.number)
      .map((i) => ({ ...i, currentMonth: true }));

    d.add(1, 'month');
    const nextMonth = this.dayGenerator
      .getPersianMonthDays(d.year, d.month.number)
      .map((i) => ({ ...i, currentMonth: false }));

    d.subtract(2, 'month');
    const preMonth = this.dayGenerator
      .getPersianMonthDays(d.year, d.month.number)
      .map((i) => ({ ...i, currentMonth: false }));

    this.days.set([preMonth, currentMonth, nextMonth].flat());
  }

  ngOnInit() {
    const now = this.dayGenerator.getNow();

    this.setByDateObj(now);
  }

  getColStart(num: number) {
    return {
      'grid-column-start': num,
    };
  }

  nextMonth() {
    const now = this.dayGenerator.getNow();

    now.setYear(this.year());
    now.setMonth(this.month().number);

    now.add(1, 'month');

    this.setByDateObj(now);
  }

  preMonth() {
    const now = this.dayGenerator.getNow();

    now.setYear(this.year());
    now.setMonth(this.month().number);

    now.subtract(1, 'month');

    this.setByDateObj(now);
  }
}

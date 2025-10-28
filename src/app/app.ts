import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { WEEK_DAYS } from '../lib/constants';
import { CalendarPane } from './calendar-pane/calendar-pane';
import { PerDateGenerator } from './per-date-generator';
import { ToolBar } from './tool-bar/tool-bar';

@Component({
  selector: 'app-root',
  imports: [ToolBar, MatButtonModule, MatDividerModule, CalendarPane],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  dayGenerator = inject(PerDateGenerator);

  weekDays = WEEK_DAYS;

  title = signal('persian-koyomi');

  months = signal<{ year: number; month: number }[]>([]);

  last = computed(() => {
    const ms = this.months(),
      last = ms[ms.length - 1];

    return last;
  });

  ngOnInit() {
    const now = this.dayGenerator.getNow();

    const year = now.year,
      month = now.month.number;
    this.months.update((vs) => [{ year, month }]);
  }

  nextMonth() {
    const now = this.dayGenerator.getNow(),
      last = this.last();

    now.setYear(last.year);
    now.setMonth(last.month);

    now.add(1, 'month');

    const year = now.year,
      month = now.month.number;
    this.months.update((vs) => [{ year, month }]);
  }

  preMonth() {
    const now = this.dayGenerator.getNow(),
      last = this.last();

    now.setYear(last.year);
    now.setMonth(last.month);

    now.subtract(1, 'month');

    const year = now.year,
      month = now.month.number;
    this.months.update((vs) => [{ year, month }]);
  }
}

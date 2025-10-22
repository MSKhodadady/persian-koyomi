import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
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
  title = signal('persian-koyomi');
  dayGenerator = inject(PerDateGenerator);
  month = signal<{ name: string; number: number }>({ name: '', number: 0 });
  year = signal<number>(0);

  days = signal<{ day: number; weekDay: number }[]>([]);

  weekDays = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'];

  ngOnInit() {
    const now = this.dayGenerator.getNow();

    this.month.set(now.month);
    this.year.set(now.year);

    this.days.set(this.dayGenerator.getPersianMonthDays(now.year, now.month.number));
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

    this.year.set(now.year);
    this.month.set(now.month);
    this.days.set(this.dayGenerator.getPersianMonthDays(now.year, now.month.number));
  }

  preMonth() {
    const now = this.dayGenerator.getNow();

    now.setYear(this.year());
    now.setMonth(this.month().number);

    now.subtract(1, 'month');

    this.year.set(now.year);
    this.month.set(now.month);
    this.days.set(this.dayGenerator.getPersianMonthDays(now.year, now.month.number));
  }
}

import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DateCard } from './date-card/date-card';
import { PerDateGenerator } from './per-date-generator';
import { ToolBar } from './tool-bar/tool-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToolBar, DateCard],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  title = signal('persian-koyomi');
  dayGenerator = inject(PerDateGenerator);

  days: { day: number; weekDay: number }[] = [];

  weekDays = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'];

  ngOnInit() {
    this.days = this.dayGenerator.getPersianMonthDays(1404, 6);
  }

  getColStart(num: number) {
    return {
      'grid-column-start': num,
    };
  }
}

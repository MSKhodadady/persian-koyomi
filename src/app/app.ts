import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { WEEK_DAYS } from '../lib/constants';
import { CalendarPane } from './calendar-pane/calendar-pane';
import { PerDateGenerator } from './per-date-generator';
import { ToolBar } from './tool-bar/tool-bar';

type PaneState = 'enter-right' | 'exit-left' | 'enter-left' | 'exit-right' | 'normal';

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
  months = signal<{ year: number; month: number; state: PaneState }[]>([]);
  last = computed(() => {
    const ms = this.months(),
      last = ms[ms.length - 1];
    return last;
  });

  clearTimeoutCounter: number | undefined = undefined;
  clear() {
    // setting a debounce function call event
    clearTimeout(this.clearTimeoutCounter);

    this.clearTimeoutCounter = setTimeout(() => {
      this.months.update((vs) => {
        const last = vs[vs.length - 1];
        return [last];
      });
    }, 500);
  }

  ngOnInit() {
    const now = this.dayGenerator.getNow();

    const year = now.year,
      month = now.month.number;
    this.months.set([{ year, month, state: 'enter-left' }]);
  }

  nextMonth() {
    const now = this.dayGenerator.getNow(),
      last = this.last();

    now.setYear(last.year);
    now.setMonth(last.month);

    now.add(1, 'month');

    const year = now.year,
      month = now.month.number;
    this.months.update((vs) => [
      ...vs.map((i) => ({
        ...i,
        state: i.state == 'exit-right' ? i.state : ('exit-right' as PaneState),
      })),
      { year, month, state: 'enter-left' },
    ]);
    this.clear();
  }

  preMonth() {
    const now = this.dayGenerator.getNow(),
      last = this.last();

    now.setYear(last.year);
    now.setMonth(last.month);

    now.subtract(1, 'month');

    const year = now.year,
      month = now.month.number;
    this.months.update((vs) => [
      ...vs.map((i) => ({
        ...i,
        state: i.state == 'exit-left' ? i.state : ('exit-left' as PaneState),
      })),
      { year, month, state: 'enter-right' },
    ]);
    this.clear();
  }

  getCalendarPaneClassName(paneState: PaneState) {
    return paneState == 'normal' ? '' : paneState;
  }
}

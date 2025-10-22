import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-date-card',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './date-card.html',
  styleUrl: './date-card.scss',
})
export class DateCard {
  dayNum = input<number>();
  weekDay = input<number>();
  currentMonth = input<number>(0);

  getDayColor() {
    const cm = this.currentMonth(),
      wd = this.weekDay(),
      res = {
        ...(wd == 7 ? { color: 'red' } : {}),

        backgroundColor:
          cm == 0
            ? 'rgba(211,211,211, 0.4)'
            : 'var(--mat-card-elevated-container-color, var(--mat-sys-surface-container-low))',
      };

    return res;
  }
}

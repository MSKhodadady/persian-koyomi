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

  getDayColor() {
    if (this.weekDay() == 7) {
      return { color: 'red' };
    } else {
      return {};
    }
  }
}

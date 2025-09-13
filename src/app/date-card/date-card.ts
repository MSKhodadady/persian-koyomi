import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-date-card',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './date-card.html',
  styleUrl: './date-card.scss',
})
export class DateCard {}

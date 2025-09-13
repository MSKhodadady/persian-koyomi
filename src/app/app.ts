import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DateCard } from './date-card/date-card';
import { ToolBar } from './tool-bar/tool-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToolBar, DateCard],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('persian-koyomi');

  readonly days = Array.from({ length: 31 }, (_, i) => i + 1);
}

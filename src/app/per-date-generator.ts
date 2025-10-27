import { Injectable } from '@angular/core';
import DateObject from 'react-date-object';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

@Injectable({
  providedIn: 'root',
})
export class PerDateGenerator {
  getPersianMonthDays(year: number, month: number): DaySlot[] {
    if (month < 1 || month > 12) return [];

    const startDay = new DateObject({ locale: persian_fa, calendar: persian });
    startDay.setYear(year);
    startDay.setMonth(month);

    const maxDay = month < 7 ? 31 : month < 12 ? 30 : startDay.isLeap ? 30 : 29;

    const res = Array.from({ length: maxDay }, (_, i) => {
      const day = i + 1;

      startDay.setDay(day);

      return { day, weekDay: startDay.weekDay.number };
    });

    return res;
  }

  getNow() {
    return new DateObject({ calendar: persian, locale: persian_fa });
  }
}

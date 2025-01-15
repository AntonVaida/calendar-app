import { CalendarType } from "../shared/types/CalendarType";

export const COUNT_DAYS_PER_WEEK = 7;

const resetTime = (date: Date) => {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};

export const getAllCurrentCalendarDates = ({
  calendarType,
  year,
  month,
  weekCoefficient
}: {
  calendarType: CalendarType,
  year: number,
  month: number,
  weekCoefficient: number
}): Date[] => {
  const allDates: Date[] = [];

  if (calendarType === CalendarType.MONTH) {
  const firstDayOfMonth = new Date(Date.UTC(year, month, 1));
  const lastDayOfMonth = new Date(Date.UTC(year, month + 1, 0));

  const startDay = firstDayOfMonth.getDay();
  const endDay = lastDayOfMonth.getDay();

  const daysBeforeStart = startDay;
  const startOfCalendar = new Date(Date.UTC(year, month, 1 - daysBeforeStart));

  const daysAfterEnd = 6 - endDay;
  const endOfCalendar = new Date(Date.UTC(year, month + 1, daysAfterEnd));

  const startOfCalendarReset = resetTime(startOfCalendar);
  const endOfCalendarReset = resetTime(endOfCalendar);

  const currentDate = startOfCalendarReset;

  while (currentDate.getTime() <= endOfCalendarReset.getTime()) {
    allDates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return allDates;
  }

  const today = new Date();
  const targetDay = new Date(today);
  targetDay.setDate(today.getDate() + (weekCoefficient * COUNT_DAYS_PER_WEEK));
  const todayUTC = new Date(Date.UTC(targetDay.getUTCFullYear(), targetDay.getUTCMonth(), targetDay.getUTCDate()));

  const currentDayOfWeek = todayUTC.getDay();

  const startWeekDate = new Date(todayUTC);
  const endWeekDate = new Date(todayUTC);

  startWeekDate.setUTCDate(targetDay.getUTCDate() - currentDayOfWeek);
  endWeekDate.setUTCDate(targetDay.getUTCDate() + (6 - currentDayOfWeek));

  const startWeekDateReset = resetTime(startWeekDate);
  const endWeekDateReset = resetTime(endWeekDate);

  const currentDate = new Date(startWeekDateReset);
  while (currentDate <= endWeekDateReset) {
    allDates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return allDates;
}
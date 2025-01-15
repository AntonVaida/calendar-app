import { CalendarType } from "../shared/types/CalendarType";

export const dateFormatter = ({
  year, 
  month,
  calendarType,
  firstDate,
  lastDate
}: {
  year: number, 
  month: number,
  calendarType: CalendarType,
  firstDate: string,
  lastDate: string
}): string => {
  const options: Intl.DateTimeFormatOptions = calendarType === CalendarType.WEEK ? {
    day: 'numeric', 
    month: 'long', 
    year: 'numeric'
  } :{
    month: "long",
    year: "numeric",
  };

  if (calendarType === CalendarType.WEEK) {
    const firstDay = new Date(firstDate);
    const lastDay = new Date(lastDate);

    const formatter = new Intl.DateTimeFormat('uk-UA', options);

    const start = formatter.format(firstDay);
    const end = formatter.format(lastDay);

    return `${start} - ${end}`;
  }

  const date = new Date(year, month, 1);

  return new Intl.DateTimeFormat("uk-UA", options).format(date);
}
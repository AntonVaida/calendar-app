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
  firstDate: Date,
  lastDate: Date
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
    const formatter = new Intl.DateTimeFormat('uk-UA', options);

    const start = formatter.format(firstDate);
    const end = formatter.format(lastDate);

    return `${start} - ${end}`;
  }

  const date = new Date(year, month, 1);

  return new Intl.DateTimeFormat("uk-UA", options).format(date);
}
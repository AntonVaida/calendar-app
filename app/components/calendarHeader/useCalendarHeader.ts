import { dateFormatter } from "@/app/utils";
import { CalendarType } from "@/app/shared/types/CalendarType";

export const useCalendarHeader = ({
  month, 
  year, 
  calendarType,
  dates
}: {
  month: number, 
  year: number,
  calendarType: CalendarType,
  dates: Date[]
}) => {
  const firstDate = dates[0];
  const lastDate = dates[dates?.length - 1];

  const formattedDate = dateFormatter({
    month, 
    year, 
    calendarType, 
    firstDate,
    lastDate
  });

  return {
    formattedDate
  }
}
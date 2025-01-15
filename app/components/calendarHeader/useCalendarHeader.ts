import { dateFormatter } from "@/app/utils";
import { CalendarType } from "@/app/shared/types/CalendarType";
import { useAppSelector } from "@/app/hooks";
import { selectDates } from "@/app/store/dates";

export const useCalendarHeader = ({
  month, 
  year, 
  calendarType
}: {
  month: number, 
  year: number,
  calendarType: CalendarType
}) => {
  const dates = useAppSelector(selectDates);
  const firstDate = dates[0]?.date;
  const lastDate = dates[dates?.length - 1]?.date;

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
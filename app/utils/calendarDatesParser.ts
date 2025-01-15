import { CalendarType } from "../shared/types/CalendarType";
import { HolidayType } from "../shared/types/HolidayType";
import { getAllCurrentCalendarDates } from "./getAllCurrentCalendarDate";
import { checkTheSameDay } from "./checkTheSameDay";
import { v4 as uuidv4 } from 'uuid';

export const calendarDatesParser = ({ 
    year, 
    month, 
    weekCoefficient, 
    calendarType,
    allHolidayList
  }: {
    year: number;
    month: number;
    weekCoefficient: number;
    calendarType: CalendarType;
    allHolidayList: HolidayType[]
  }) => {

  const calendarDates = getAllCurrentCalendarDates({
      calendarType,
      year,
      month,
      weekCoefficient,
    });

  const parsedDatesInformation = calendarDates?.map((date: Date) => ({
    date: date.toISOString(),
    activities:allHolidayList?.length
      ? allHolidayList.filter((activity: HolidayType) => {
          return checkTheSameDay({  firstDate: new Date(activity?.date), secondDate: date})
        })?.map((activity: HolidayType) => ({
          id: uuidv4(),
          title: activity?.name,
          description: '',
          isHoliday: true,
          order: 0,
        }))
      : [],
  }));

  return parsedDatesInformation;
}
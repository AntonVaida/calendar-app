import { checkTheSameDay } from "./checkTheSameDay";
import { ActivityType } from "../shared/types/ActivityType";

export const calendarDatesParser = ({ 
    activityList,
    calendarDates
  }: {
    activityList: ActivityType[]
    calendarDates: Date[]
  }) => {

  const parsedDatesInformation = calendarDates?.map((date: Date) => ({
    date: date.toISOString(),
    activities:activityList?.length
      ? activityList.filter((activity: ActivityType) => {
          return activity?.date && checkTheSameDay({  firstDate: new Date(activity?.date), secondDate: date})
        }).sort((activityA, activityB) => activityA?.order - activityB?.order)
      : [],
  }));

  return parsedDatesInformation;
}
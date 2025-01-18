
import { useState, useMemo } from "react";
import { getCalendarItemBorderConfiguration } from "@/app/utils/getCalendarItemBorderConfiguration";
import { CalendarType } from "@/app/shared/types/CalendarType";
import { useAppSelector } from "@/app/hooks";
import { selectActivityList } from "@/app/store/activity";
import { activityFilter } from "@/app/utils";
import { useDroppable } from "@dnd-kit/core";
import { makeSelectActivityListPerDate } from "@/app/store/activity";
import { useSelectorCreator } from "@rbxts/roact-reflex";
import { shallowEqual } from "react-redux";


export const useCalendarGridItem = ({
  date, 
  index, 
  calendarType
}: {
  date: Date, 
  index: number,
  calendarType: CalendarType
}) => {
 const [isOpen, setIsOpen] = useState(false);
 const calendarItemBorderConfiguration = getCalendarItemBorderConfiguration(index, calendarType);

 const selector = useMemo(() => {
    return makeSelectActivityListPerDate(date);
}, [date]);

 const filteredActivities = useAppSelector(selector, (prev, next) => JSON.stringify(prev) === JSON.stringify(next));

 console.count('MyComponent renders')
  const { setNodeRef } = useDroppable({
    id: date.toISOString(),
    data: {type: "date", date: date.toISOString()}
  });

 const inputDate = date;
 const today = new Date();

 const isToday = inputDate.getFullYear() === today.getFullYear() 
  && inputDate.getMonth() === today.getMonth() 
  && inputDate.getDate() === today.getDate();

  const parsedDateValue = date.getDate();


  const activitiesId = useMemo(() => {
    return filteredActivities?.map(activity => activity?.id)
  }, [filteredActivities])

  const handleSideBarOpen = () => {
    setIsOpen(true);
  };

  const handleSideBarClose = () => {
    setIsOpen(false);
  };

 return {
  calendarItemBorderConfiguration,
  isToday,
  parsedDateValue,
  handleSideBarOpen,
  handleSideBarClose,
  isOpen,
  filteredActivities,
  setNodeRef,
  activitiesId
 }
}
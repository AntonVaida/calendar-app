
import { useState } from "react";
import { getCalendarItemBorderConfiguration } from "@/app/utils/getCalendarItemBorderConfiguration";
import { DateType } from "@/app/shared/types/DateType";
import { CalendarType } from "@/app/shared/types/CalendarType";

export const useCalendarGridItem = ({
  data, 
  index, 
  calendarType
}: {
  data: DateType, 
  index: number,
  calendarType: CalendarType
}) => {
 const [isOpen, setIsOpen] = useState(false);
 const calendarItemBorderConfiguration = getCalendarItemBorderConfiguration(index, calendarType);

 const inputDate = new Date(data?.date);
 const today = new Date();

 const isToday = inputDate.getFullYear() === today.getFullYear() 
  && inputDate.getMonth() === today.getMonth() 
  && inputDate.getDate() === today.getDate();

  const parsedDateValue = new Date(data?.date).getDate()

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
  isOpen
 }
}

import { useState, useMemo, useEffect, useRef } from "react";
import { getCalendarItemBorderConfiguration } from "@/app/utils/getCalendarItemBorderConfiguration";
import { CalendarType } from "@/app/shared/types/CalendarType";
import { useAppSelector } from "@/app/hooks";
import { makeSelectActivityListPerDate } from "@/app/store/activity";
import { shallowEqual } from "react-redux";
import { checkTheSameDay } from "@/app/utils/checkTheSameDay";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { DateTime } from "luxon";
import { formatDateToISO } from "@/app/utils";

export const useCalendarGridItem = ({
  date, 
  index, 
  calendarType
}: {
  date: Date, 
  index: number,
  calendarType: CalendarType
}) => {
 const ref = useRef(null);
 const [highlight, setHighlight] = useState(false);
 const [isOpen, setIsOpen] = useState(false);
 const calendarItemBorderConfiguration = getCalendarItemBorderConfiguration(index, calendarType);

 const selector = useMemo(() => {
    return makeSelectActivityListPerDate(date);
}, [date]);

const filteredActivities = useAppSelector(selector, shallowEqual);

useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const monitorConfig = {
      element,
      getData() {

      },
      // @ts-expect-error payload
      onDrag(payload) {
        const { location } = payload;

        const target = location.current.dropTargets[0];

        if (!target) {
          return;
        }

        if (checkTheSameDay({firstDate: new Date(target.data.date), secondDate: new Date(date)})) {
          setHighlight(true);
        } else {
          setHighlight(false);
        }
      },
      onDrop() {
        setHighlight(false);
      },
    }

    return monitorForElements(monitorConfig);
  }, [date]);

 const inputDate = DateTime.fromISO(formatDateToISO(date), { zone: 'Europe/Kiev' });;
 const today = DateTime.now().setZone('Europe/Kiev');

 const isToday = inputDate.hasSame(today, 'day');;

  const parsedDateValue = date.getDate();


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
  ref,
  highlight
 }
}
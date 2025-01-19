import { useState, useEffect, useMemo } from "react";
import { CalendarType } from "@/app/shared/types/CalendarType";
import { getAllCurrentCalendarDates } from "@/app/utils";

const CURRENT_YEAR = new Date().getFullYear();
const CURRENT_MONTH = new Date().getMonth();

export const useCalendar = () => {
  const [year, setYear] = useState(CURRENT_YEAR);
  const [month, setMonth] = useState(CURRENT_MONTH);
  const [calendarType, setCalendarType] = useState(CalendarType.MONTH);
  const [weekCoefficient, setWeekCoefficient] = useState(0);

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(prevYear => prevYear - 1)
    } else {
      setMonth(prevMonth => prevMonth - 1);
    }
  }

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(prevYear => prevYear + 1)
    } else {
      setMonth(prevMonth => prevMonth + 1);
    }
  }

  useEffect(()=> {
    setYear(CURRENT_YEAR);
    setMonth(CURRENT_MONTH);
    setWeekCoefficient(0)
  }, [calendarType])

  const handlePrevWeek = () => {
    setWeekCoefficient(prevWeekCoefficient => prevWeekCoefficient - 1)
  }

  const handleNextWeek = () => {
    setWeekCoefficient(prevWeekCoefficient => prevWeekCoefficient + 1)
  }

  const dates = useMemo(() => {
    return getAllCurrentCalendarDates({
    calendarType,
    year,
    month,
    weekCoefficient,
  });
  }, [
    calendarType, 
    year, 
    month, 
    weekCoefficient,
  ])


  return {
    year,
    month,
    calendarType,
    weekCoefficient,
    setCalendarType,
    handleArrowBackButton: calendarType === CalendarType.MONTH ? handlePrevMonth : handlePrevWeek,
    handleArrowNextButton: calendarType === CalendarType.MONTH ? handleNextMonth : handleNextWeek,
    dates
  }
}
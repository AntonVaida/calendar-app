"use client";
import React from 'react';
import { useCalendar } from './useCalendar';
import { CalendarGrid } from '../calendarGrid';
import { CalendarHeader } from '../calendarHeader';


export const Calendar = () => {
  const {
    year, 
    month, 
    calendarType, 
    setCalendarType,
    handleArrowBackButton,
    handleArrowNextButton,
    dates
  } = useCalendar()

  return (
    <>
      <CalendarHeader 
        calendarType={calendarType} 
        setCalendarType={setCalendarType}
        month={month}
        year={year}
        handleArrowBackButton={handleArrowBackButton}
        handleArrowNextButton={handleArrowNextButton}
        dates={dates}
      />
      <CalendarGrid 
        year={year} 
        calendarType={calendarType} 
        dates={dates}
      />
    </>
    );
}
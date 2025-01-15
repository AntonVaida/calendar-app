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
    weekCoefficient, 
    setCalendarType,
    handleArrowBackButton,
    handleArrowNextButton
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
      />
      <CalendarGrid 
        year={year} 
        month={month}
        calendarType={calendarType} 
        weekCoefficient={weekCoefficient} 
      />
    </>
    );
}
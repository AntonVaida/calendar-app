
import { useEffect, useRef, useMemo } from 'react';
import { useAppDispatch } from '../../hooks';
import { datesActions } from '../../store/dates';
import { useAppSelector } from '../../hooks';
import { selectAllHolidayList, selectDates } from '../../store/dates';
import { CalendarType } from '@/app/shared/types/CalendarType';
import { useContainerSize } from '../../hooks';
import { COUNT_DAYS_PER_WEEK } from '@/app/utils';
import { DAYS_OF_WEEK_HEIGHT } from '../daysOfTheWeekGridItem';


export const useCalendarGrid = ({
  year,
  month,
  calendarType,
  weekCoefficient
}: {
  year: number, 
  month: number, 
  calendarType: CalendarType, 
  weekCoefficient: number
}) => {
  const containerRef = useRef(null);
  const dispatch = useAppDispatch();
  const dates = useAppSelector(selectDates);
  const allHolidayList = useAppSelector(selectAllHolidayList);
  const {containerHeight} = useContainerSize(containerRef);

  const gridItemsHeight = useMemo(()=> {
    if (containerHeight && dates?.length) {
      const rowColumn = Math.ceil(dates?.length / COUNT_DAYS_PER_WEEK);
      return Math.round((containerHeight - DAYS_OF_WEEK_HEIGHT) / rowColumn)
    }
  }, [containerHeight, dates]);

    console.log('useCalendar', {containerHeight, gridItemsHeight})

  useEffect(() => {
    dispatch(datesActions.getAllHolidayList(year));
  }, [year, dispatch])

  useEffect(() => {
    dispatch(datesActions.processCalendarDates({year, month, calendarType, weekCoefficient, allHolidayList}))
  }, [
    dispatch,
    year, 
    month,
    calendarType,
    weekCoefficient,
    allHolidayList
  ])

  return {
    dates,
    containerRef,
    gridItemsHeight
  }
}
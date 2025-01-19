
import { useEffect, useRef, useMemo } from 'react';
import { useAppDispatch} from '../../hooks';
import { activitiesActions } from '../../store/activity';
import { useContainerSize } from '../../hooks';
import { COUNT_DAYS_PER_WEEK } from '@/app/utils';
import { DAYS_OF_WEEK_HEIGHT } from '../daysOfTheWeekGridItem';


export const useCalendarGrid = ({
  year,
  dates
}: {
  year: number,
  dates: Date[]
}) => {
  const containerRef = useRef(null);
  const dispatch = useAppDispatch();
  const {containerHeight} = useContainerSize(containerRef);

  useEffect(() => {
    dispatch(activitiesActions.getAllHolidayList(year));
  }, [year, dispatch])


  const gridItemsHeight = useMemo(()=> {
    if (containerHeight && dates?.length) {
      const rowColumn = Math.ceil(dates?.length / COUNT_DAYS_PER_WEEK);
      return Math.round((containerHeight - DAYS_OF_WEEK_HEIGHT) / rowColumn)
    }
  }, [containerHeight, dates]);


  return {
    containerRef,
    gridItemsHeight,
  }
}
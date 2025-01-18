
import { useEffect, useRef, useMemo, useState } from 'react';
import { useAppDispatch} from '../../hooks';
import { activitiesActions } from '../../store/activity';
import { useContainerSize } from '../../hooks';
import { COUNT_DAYS_PER_WEEK } from '@/app/utils';
import { DAYS_OF_WEEK_HEIGHT } from '../daysOfTheWeekGridItem';
import { ActivityType } from '@/app/shared/types/ActivityType';
import { DragStartEvent, DragOverEvent, Over, Active } from '@dnd-kit/core';


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
  const [activeActivity, setActiveActivity] = useState<ActivityType | null>(null);

  useEffect(() => {
    dispatch(activitiesActions.getAllHolidayList(year));
  }, [year, dispatch])


  const gridItemsHeight = useMemo(()=> {
    if (containerHeight && dates?.length) {
      const rowColumn = Math.ceil(dates?.length / COUNT_DAYS_PER_WEEK);
      return Math.round((containerHeight - DAYS_OF_WEEK_HEIGHT) / rowColumn)
    }
  }, [containerHeight, dates]);


    
  const onDragEnd = () => {
    setActiveActivity(null);
  }

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "activity") {
      setActiveActivity(event.active.data.current.activity);
      return
    }
  }

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if(!over) return;
    dispatch(activitiesActions.dragAndDrop({activeActivity, active: {id: active.id, data: active.data} as Active, over: {id: over.id, data: over.data} as Over}));
  }

  return {
    containerRef,
    gridItemsHeight,
    onDragEnd,
    onDragStart,
    onDragOver,
    activeActivity,
  }
}
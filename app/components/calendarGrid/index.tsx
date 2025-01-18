"use client";
import React from 'react';
import { CalendarType } from '../../shared/types/CalendarType';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useCalendarGrid } from './useCalendarGrid';
import { CalendarGridItem } from '../calendarGridItem';
import { DaysOfTheWeekGrid } from '../daysOfTheWeekGrid';
import {DndContext,} from '@dnd-kit/core';
import { createPortal } from 'react-dom';
import { ActivitiesItem } from '../activitiesItem';
import { DragOverlay } from '@dnd-kit/core';

export const CalendarGrid = ({
  year, 
  calendarType, 
  dates
  }: {
  year: number, 
  calendarType: CalendarType, 
  dates: Date[]
  }) => {
  const { 
    containerRef,
    gridItemsHeight,
    onDragEnd,
    onDragStart,
    onDragOver,
    activeActivity
  } = useCalendarGrid({
    year,
    dates
  });
    

return (
    <Box 
      sx={(theme) => ({
        flexGrow: 1,
        bgcolor: theme.palette.primary.main,
        height: "calc(100vh - 68px)",
        width: "100vw",
      })}
    >
      <Box ref={containerRef} sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        overflow: "hidden",
        marginBottom: "30px",
        marginLeft: "30px",
        marginRight: "30px"
      }}>
      <DaysOfTheWeekGrid />
      <Grid 
        sx={{
          boxSizing: "border-box",
          flexGrow: 1,
        }} 
        container
        columns={7}
      >
        <DndContext 
          onDragEnd={onDragEnd} 
          onDragStart={onDragStart}
          onDragOver={onDragOver}
        >
        {dates?.map((date, index) => (
          <CalendarGridItem 
            date={date} 
            index={index} 
            key={index} 
            calendarType={calendarType}
            gridItemsHeight={gridItemsHeight}
          />
        ))}
           {typeof window !== "undefined" &&
            createPortal(
             // @ts-expect-error: DragOverlay expects 'never'
              <DragOverlay>
                {activeActivity ? (
                  <ActivitiesItem
                    activity={activeActivity}
                    index={activeActivity?.id}
                  /> 
                ) : null}
              </DragOverlay>,
              document.body
            )}
        </DndContext>
      </Grid>
      </Box>
    </Box>
  );
}
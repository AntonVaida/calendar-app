"use client";
import React from 'react';
import { CalendarType } from '../../shared/types/CalendarType';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useCalendarGrid } from './useCalendarGrid';
import { CalendarGridItem } from '../calendarGridItem';
import { DaysOfTheWeekGrid } from '../daysOfTheWeekGrid';

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
      <Box ref={containerRef} 
        sx={{
          height: "calc(100% - 30px)",
          display: "flex",
          flexDirection: "column",
          borderRadius: 3,
          overflow: "hidden",
          marginBottom: "30px",
          marginLeft: "30px",
          marginRight: "30px"
        }}
      >
        <DaysOfTheWeekGrid />
        <Grid 
          sx={{
            boxSizing: "border-box",
            flexGrow: 1,
            backgroundColor: "red",
          }} 
          container
          columns={7}
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
        </Grid>
      </Box>
    </Box>
  );
}
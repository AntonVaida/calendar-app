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
  month, 
  calendarType, 
  weekCoefficient
  }: {
  year: number, 
  month: number, 
  calendarType: CalendarType, 
  weekCoefficient: number
  }) => {
  const { 
    dates, 
    containerRef, 
    gridItemsHeight 
  } = useCalendarGrid({
    year, 
    month, 
    calendarType, 
    weekCoefficient
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
        {dates?.map((data, index) => (
          <CalendarGridItem 
            data={data} 
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
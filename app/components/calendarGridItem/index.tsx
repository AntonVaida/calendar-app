import { Fragment } from 'react';
import { SideBar } from '../sideBar';
import Grid from '@mui/material/Grid2';
import { Box, Typography } from '@mui/material';
import { useCalendarGridItem } from './useCalendarGridItem';
import { CalendarType } from '@/app/shared/types/CalendarType';
import { ActivitiesItem } from '@/app/components/activitiesItem';
import { EmptyActivityItem } from '../emptyActivityItem';

export const CalendarGridItem = ({
  date,
  index,
  calendarType,
  gridItemsHeight
 }: {
  date: Date,
  index: number,
  calendarType: CalendarType
  gridItemsHeight?: number
}) => {
  const {
    calendarItemBorderConfiguration, 
    isToday,
    parsedDateValue,
    handleSideBarOpen,
    handleSideBarClose,
    isOpen,
    filteredActivities,
    ref,
    highlight
  } = useCalendarGridItem({date, index, calendarType});


  return (
    <Fragment>
      <SideBar   
        isOpen={isOpen}
        handleSideBarClose={handleSideBarClose} 
        handleSideBarOpen={handleSideBarOpen} 
        date={date}
      />
      <Grid
        onClick={handleSideBarOpen}
        size={1} 
        key={index} 
        sx={(theme) => ({
          backgroundColor: highlight ? theme.palette.secondary.dark : theme.palette.primary.light,
          ...calendarItemBorderConfiguration,
          borderColor: theme.palette.secondary.dark,
          borderStyle: "solid",
          height: gridItemsHeight ? `${gridItemsHeight}px` : "100%"
        })}
      >
        <Box
          ref={ref}
          sx={{
            height: gridItemsHeight ? `${gridItemsHeight}px` : "100%",
            padding: "10px",
            paddingTop: "3px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{
            height: "25px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <Box sx={(theme) => ({
              height: "25px",
              width: "25px",
              borderRadius: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxSizing: "border-box",
              backgroundColor: isToday ? theme.palette.secondary.light : "transparent",
            })}>
              <Typography variant={isToday ? "body2" : "body1"}>
                {parsedDateValue}
              </Typography>
            </Box>
          </Box>
            <Box
              sx={{
                maxHeight: "100%",
                boxSizing: "border-box",
                overflowY: "auto",
                overflowX: "hidden"
              }}>
                {filteredActivities?.map((activity) => (
                  <ActivitiesItem index={activity?.id}  activity={activity} key={activity?.id} />
                ))}
            </Box>
            <EmptyActivityItem date={date} />
        </Box>
      </Grid>
    </Fragment>
  )
}
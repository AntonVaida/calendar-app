import Grid from '@mui/material/Grid2';
import { Box, Typography } from '@mui/material';
import { DateType } from '@/app/shared/types/DateType';
import { useCalendarGridItem } from './useCalendarGridItem';
import { CalendarType } from '@/app/shared/types/CalendarType';
import { ActivitiesItem } from '@/app/components/activitiesItem';
import { SideBar } from '../sideBar';

export const CalendarGridItem = ({
  data,
  index,
  calendarType,
  gridItemsHeight
 }: {
  data: DateType,
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
    isOpen
  } = useCalendarGridItem({data, index, calendarType});

  return (
    <>
      <SideBar   
        isOpen={isOpen}
        handleSideBarClose={handleSideBarClose} 
        handleSideBarOpen={handleSideBarOpen} 
        data={data}
      />
      <Grid
        onClick={handleSideBarOpen}
        size={1} 
        key={index} 
        sx={(theme) => ({
          backgroundColor: theme.palette.primary.light,
          ...calendarItemBorderConfiguration,
          borderColor: theme.palette.secondary.dark,
          borderStyle: "solid",
          height: gridItemsHeight ? `${gridItemsHeight}px` : "100%"
        })}
      >
        <Box 
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
              backgroundColor: isToday ? theme.palette.secondary.light : theme.palette.primary.light,
            })}>
              <Typography variant={isToday ? "body2" : "body1"}>
                {parsedDateValue}
              </Typography>
            </Box>
          </Box>
          <Box sx={{
            overflowY: "auto",
            overflowX: "hidden",
            maxHeight: "100%",
            boxSizing: "border-box",
          }}>
            {data?.activities?.map((activity, index) => (
              <ActivitiesItem index={index} activity={activity} key={index} />
            ))}
          </Box>
        </Box>
      </Grid>
    </>
  )
}
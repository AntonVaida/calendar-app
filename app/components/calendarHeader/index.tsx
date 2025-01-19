import { Dispatch, SetStateAction } from "react";
import { CalendarType } from "@/app/shared/types/CalendarType";
import { Box, Typography } from '@mui/material';
import { useCalendarHeader } from "./useCalendarHeader";
import { 
  ArrowBackButton, 
  ArrowForwardButton, 
  SelectCalendarMode 
} from "@/app/ui-components";

export const CalendarHeader = ({
  calendarType,
  setCalendarType,
  month,
  year,
  handleArrowBackButton,
  handleArrowNextButton,
  dates
}: {
  calendarType: CalendarType, 
  setCalendarType: Dispatch<SetStateAction<CalendarType>>;
  month: number;
  year: number;
  handleArrowBackButton: () => void;
  handleArrowNextButton: () => void;
  dates: Date[];
}) => {
  const { formattedDate } = useCalendarHeader({month, year, calendarType, dates})

  return (
    <Box sx={(theme) => ({
      bgcolor: theme.palette.primary.main,
      height: "68px",
      display: "flex",
      justifyContent: "center"
    })}>
      <Box sx={{
        width: "100%",
        flexGrow: 1,
        height: "68px",
        marginLeft: "30px",
        marginRight: "30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <Box sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center"
        }}>
          <Box sx={{
            width: "64px",
            display: "flex",
            justifyContent: "start",
            alignItems: "center"
          }}>
            <ArrowBackButton onClick={handleArrowBackButton} />
            <ArrowForwardButton onClick={handleArrowNextButton} />
          </Box>
          <Box sx={{
            marginLeft: "10px"
          }}>
            <Typography variant={"subtitle1"}>
              {formattedDate}
            </Typography>
          </Box>
        </Box>
        <Box>
          <SelectCalendarMode  calendarType={calendarType} onChange={setCalendarType} />
        </Box>
      </Box>
    </Box>
  )
}
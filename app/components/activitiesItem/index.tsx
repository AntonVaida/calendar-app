import { Box, Typography } from '@mui/material';
import { ActivityType } from '../../shared/types/ActivityType';
import { useActivitiesItem } from './useActivitiesItem';

export const ActivitiesItem = ({
  index, 
  activity
}: {
  index: number, 
  activity: ActivityType
}) => {
  const {
    handleClick,
    activityTitle
  } = useActivitiesItem({activity})

  return (
    <Box
      onClick={handleClick}
      key={index} 
      sx={(theme) => ({
        height: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: activity?.isHoliday ? theme.palette.primary.dark : theme.palette.secondary.main,
        borderRadius: "10px",
        marginTop: "5px",
        zIndex: 5,
        cursor: "pointer"
      })}
    >
      <Typography variant={"body2"}>
        {activityTitle}
      </Typography>
    </Box>
  )
}
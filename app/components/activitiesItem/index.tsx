import { Box, Typography } from '@mui/material';
import { ActivityType } from '../../shared/types/ActivityType';
import { useActivitiesItem } from './useActivitiesItem';

export const ActivitiesItem = ({
  index, 
  activity
}: {
  index: string, 
  activity: ActivityType
}) => {
  const {
    handleClick,
    activityTitle,
    setNodeRef, 
    attributes, 
    listeners, 
    isDragging,
    style
  } = useActivitiesItem({activity})

  if (isDragging) {
    return (
      <Box
        style={style}
        key={index} 
        sx={(theme) => ({
          height: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: activity?.isHoliday ? theme.palette.primary.dark : theme.palette.secondary.main,
          borderRadius: "10px",
          marginTop: "5px",
          cursor: "pointer",
          opacity: "50%"
        })}
      />
    )
  }

  return (
    <Box
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
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
        cursor: "pointer"
      })}
    >
      <Typography variant={"body2"}>
        {activityTitle}
      </Typography>
    </Box>
  )
}
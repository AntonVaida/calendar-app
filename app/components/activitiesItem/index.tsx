import { Box, Typography } from '@mui/material';
import { ActivityType } from '../../shared/types/ActivityType';
import { useActivitiesItem } from './useActivitiesItem';
import { createPortal } from 'react-dom';

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
    isDragging,
    aboutToDrop,
    preview,
    containerWidth,
    ref
  } = useActivitiesItem({activity})

  return (
    <Box ref={ref}>
      {aboutToDrop && !activity?.isHoliday ? (
        <Box sx={{
          paddingTop: "5px",
        }}>
          <Box sx={(theme) => ({
            height: "3px",
            width: "100%",
            backgroundColor: theme.palette.secondary.light,
            borderRadius: "2px"
          })} />
        </Box>
      ) : null}
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
            cursor: "pointer",
            overflow: "hidden",
            marginTop: "5px",
            opacity: isDragging ? "50%" : "100%"
          })}
        >
          <Typography variant={"body2"}>
            {activityTitle}
          </Typography>
        </Box>
      {preview ? (createPortal(<PreviewActivity activity={activity} containerWidth={containerWidth} />, preview)) : null}
    </Box>
  )
}

const PreviewActivity = ({
  activity,
  containerWidth
} : {
   activity: ActivityType,
   containerWidth: number
}) => {
  return (
    <Box
      sx={(theme) => ({
        height: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: activity?.isHoliday ? theme.palette.primary.dark : theme.palette.secondary.main,
        borderRadius: "10px",
        marginTop: "5px",
        cursor: "pointer",
        overflow: "hidden",
        width: `${containerWidth}px`
      })}
    >
      <Typography variant={"body2"}>
        {activity?.title}
      </Typography>
    </Box>
  )
}
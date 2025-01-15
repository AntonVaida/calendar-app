import { Box, Typography } from '@mui/material';
import { ActivityType } from '@/app/shared/types/ActivityType';
import { CloseButton } from '@/app/ui-components';
import { DateType } from '@/app/shared/types/DateType';
import { useSideBarActivitiesItem } from './useSideBarActivitiesItem';

export const SideBarActivitiesItem = ({
  activity,
  data
}: {
  activity: ActivityType,
  data: DateType
}) => {
  const { handleDeleteActivity } = useSideBarActivitiesItem({data, activity})

  return (
    <Box sx={{
      marginTop: "10px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <Box 
        sx={(theme) => ({
          padding: "10px",
          backgroundColor: activity?.isHoliday ? theme.palette.primary.dark : theme.palette.secondary.main,
          borderRadius: "20px",
          cursor: "pointer",
          flexGrow: 1
        })}>
          <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <Typography variant="body2">
              {activity?.title}
            </Typography>
          </Box>
          {activity?.description ? (
            <Box sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "10px"
            }}>
              <Typography variant="body2">
                {activity?.description}
              </Typography>
            </Box>
          ) : null}
      </Box>
      {!activity?.isHoliday ? (
        <CloseButton onClick={handleDeleteActivity} />
      ) : null}
    </Box>
  )
}
import { Box, Typography } from '@mui/material';
import { ActivityType } from '@/app/shared/types/ActivityType';
import { CloseButton } from '@/app/ui-components';
import { useSideBarActivitiesItem } from './useSideBarActivitiesItem';
import {CSS} from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';

export const SideBarActivitiesItem = ({
  activity,
}: {
  activity: ActivityType,
}) => {
  const { handleDeleteActivity } = useSideBarActivitiesItem({ activity})
    const {
    setNodeRef, 
    attributes, 
    listeners, 
    transform,
    transition,
    isDragging
  } = useSortable({
      id: activity?.id, 
      data: {type: "activity-side-bar", activity},
      disabled: activity?.isHoliday
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Box 
      sx={{
        marginTop: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
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
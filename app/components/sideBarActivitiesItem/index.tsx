import { Box, Typography } from '@mui/material';
import { ActivityType } from '@/app/shared/types/ActivityType';
import { CloseButton } from '@/app/ui-components';
import { useSideBarActivitiesItem } from './useSideBarActivitiesItem';
import { useRef, useEffect, useState } from 'react';
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { activitiesActions } from '@/app/store/activity';
import { useAppDispatch } from '@/app/hooks';
import { createPortal } from 'react-dom';
import { useContainerSize } from '@/app/hooks';

export const SideBarActivitiesItem = ({
  activity,
}: {
  activity: ActivityType,
}) => {
  const { handleDeleteActivity } = useSideBarActivitiesItem({ activity})
  const [isDragging, setIsDragging] = useState(false);
  const [aboutToDrop, setAboutToDrop] = useState(false);
  const [preview, setPreview] = useState<HTMLElement | null>(null)
  const ref = useRef(null)
  const dispatch = useAppDispatch();
    const {containerWidth} = useContainerSize(ref);

  useEffect(() => {
    const element = ref?.current;

    if (!element) return;

    const draggableConfig = {
      element,
      getInitialData() {
        return activity;
      },
      canDrag() {
        return !activity.isHoliday;
      },

      onDragStart: () => {
        setIsDragging(true)
      },
      onDrop: () => {
        setIsDragging(false)
      },
      // @ts-expect-error payload
      onGenerateDragPreview({ nativeSetDragImage }) {
          setCustomNativeDragPreview({
            render({ container }) {
              setPreview(container);
            },
            nativeSetDragImage,
          });
      }
    }

    const dropConfig = {
      element,
      getData() {
        return activity;
      },

      onDragEnter() {
        setAboutToDrop(true)
      },
      
      onDragLeave() {
        setAboutToDrop(false)
      },

      // @ts-expect-error payload
      onDrop(payload) {
        const { source, self } = payload;
        setAboutToDrop(false)
        const target = self;

        dispatch(activitiesActions.dragAndDrop({
          draggableItem: source?.data, 
          targetDate: target?.data?.date,
          targetActionId: target?.data?.id
        }))
      },
    };

    return combine(draggable(draggableConfig), dropTargetForElements(dropConfig));
  }, [activity])

  return (
    <Box
      ref={ref}
      sx={{
        paddingTop: aboutToDrop && !activity?.isHoliday ? "4px" : "10px",
      }}
    >
      {aboutToDrop && !activity?.isHoliday ? (
        <Box sx={{
          paddingBottom: "4px",
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
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          opacity: isDragging ? "50%" : "100%"
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
      {preview ? (createPortal(<PreviewSideBarActivitiesItem activity={activity} containerWidth={containerWidth} />, preview)) : null}
    </Box>
  )
}

const PreviewSideBarActivitiesItem = ({
  activity, 
  containerWidth
}: {
  activity: ActivityType, 
  containerWidth: number
}) => {
  return (
    <Box 
      sx={(theme) => ({
        padding: "10px",
        backgroundColor: activity?.isHoliday ? theme.palette.primary.dark : theme.palette.secondary.main,
        borderRadius: "20px",
        cursor: "pointer",
        width: `${containerWidth}px`
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
  )
}
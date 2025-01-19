import { useEffect, useRef, useState } from "react";
import { ActivityType } from "@/app/shared/types/ActivityType"
import { textLimitHelper } from "@/app/utils";
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { useContainerSize } from "@/app/hooks";
import { useAppDispatch } from "@/app/hooks";
import { activitiesActions } from '@/app/store/activity';

export const useActivitiesItem = ({
  activity
}: {
  activity: ActivityType
}) => {
  const ref = useRef(null)
  const [isDragging, setIsDragging] = useState(false);
  const [aboutToDrop, setAboutToDrop] = useState(false);
  const [preview, setPreview] = useState<HTMLElement | null>(null)
  const dispatch = useAppDispatch();
  const {containerWidth} = useContainerSize(ref);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const activityTitle = textLimitHelper({text: activity?.title, limit: 16});

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

  return {
    handleClick,
    activityTitle,
    isDragging,
    aboutToDrop,
    preview,
    containerWidth,
    ref
  }
}
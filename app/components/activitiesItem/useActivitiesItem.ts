import { ActivityType } from "@/app/shared/types/ActivityType"
import { textLimitHelper } from "@/app/utils";
import {CSS} from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';

export const useActivitiesItem = ({
  activity
}: {
  activity: ActivityType
}) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const activityTitle = textLimitHelper({text: activity?.title, limit: 16});

  const {
    setNodeRef, 
    attributes, 
    listeners, 
    transform,
    transition,
    isDragging
  } = useSortable({
      id: activity?.id, 
      data: {type: "activity", activity},
      disabled: activity?.isHoliday
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return {
    handleClick,
    activityTitle,
    setNodeRef, 
    attributes, 
    listeners, 
    isDragging,
    style
  }
}
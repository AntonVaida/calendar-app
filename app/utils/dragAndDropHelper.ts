import { ActivityType } from "../shared/types/ActivityType";
import { activityFilter } from "./activityFilter";

export const dragAndDropHelper = ({
  activityList,
  draggableItem,
  toNewCalendarDate,
  targetDate,
  targetActionId,
}: {
  activityList: ActivityType[];
  draggableItem: ActivityType;
  toNewCalendarDate?: boolean;
  targetDate?: string;
  targetActionId?: string;
}) => {
  if (!targetDate) return;

  if (toNewCalendarDate) {
    const activitiesOnTargetDate = activityFilter({ activityList, date: new Date(targetDate) });
    const updatedItem = { ...draggableItem, date: targetDate, order: activitiesOnTargetDate.length };
    const remainingActivities = activityList.filter((activity) => activity.id !== draggableItem.id);

    return [...remainingActivities, updatedItem];
  }

  if (!targetActionId) return;

  const activitiesOnTargetDate = activityFilter({ activityList, date: new Date(targetDate) });
  const filteredActivities = activitiesOnTargetDate.filter((activity) => activity.id !== draggableItem.id);
  const targetPosition = filteredActivities.findIndex((activity) => activity.id === targetActionId);
  const targetItem = filteredActivities.find(activity => activity?.id === targetActionId);


  if (targetPosition === -1 || targetItem?.isHoliday) return;

  filteredActivities.splice(targetPosition, 0, { ...draggableItem, date: targetDate, order: targetPosition });
  const orderedActivities = filteredActivities.map((activity, index) => ({
    ...activity,
    order: index,
  }));

  const remainingActivities = activityList.filter(
    (activity) => !orderedActivities.some((updatedActivity) => updatedActivity.id === activity.id)
  );

  return [...remainingActivities, ...orderedActivities];
};

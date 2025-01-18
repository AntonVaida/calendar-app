import { ActivityType } from "../shared/types/ActivityType";

export const swapOrder = (activity1: ActivityType, activity2: ActivityType) => {
  const updatedActivity1 = { ...activity1, order: activity2.order };
  const updatedActivity2 = { ...activity2, order: activity1.order };

  return [updatedActivity1, updatedActivity2];

};
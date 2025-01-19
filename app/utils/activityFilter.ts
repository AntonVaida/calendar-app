import { ActivityType } from "../shared/types/ActivityType";
import { checkTheSameDay } from "./checkTheSameDay";

export const activityFilter = ({activityList, date}: {activityList: ActivityType[], date: Date}) => {
  return activityList.filter((activity: ActivityType) => {
        return activity?.date && checkTheSameDay({  firstDate: new Date(activity?.date), secondDate: date})
      }).sort((activityA, activityB) => activityA?.order - activityB?.order);
};
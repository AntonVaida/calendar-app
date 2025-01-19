import { ActivityType } from "../shared/types/ActivityType"

export const activityUpdateParser = ({
  activityList, 
  activitiesFromHoliday
}: {
  activityList: ActivityType[], 
  activitiesFromHoliday: ActivityType[]
}) => {
  const activityListWithoutHolidays = activityList?.filter(activity => !activity?.isHoliday);

  return [...activityListWithoutHolidays, ...activitiesFromHoliday]?.sort((activityA, activityB) => activityA?.order - activityB?.order);
}
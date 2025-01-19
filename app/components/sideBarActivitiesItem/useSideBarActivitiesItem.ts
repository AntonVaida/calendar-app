import { ActivityType } from "@/app/shared/types/ActivityType"
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectActivityList, activitiesActions } from "@/app/store/activity";

export const useSideBarActivitiesItem = ({
  activity,
}:{
  activity: ActivityType,
}) => {
  const dispatch = useAppDispatch();
  const activityList = useAppSelector(selectActivityList);

  const handleDeleteActivity = () => {
    try {
      dispatch(activitiesActions.deleteActivities({
        activityList,
        activityId: activity?.id
      }));
    } catch (e: unknown) {
      console.error(e);
    }
  }

  return {
    handleDeleteActivity
  }
}
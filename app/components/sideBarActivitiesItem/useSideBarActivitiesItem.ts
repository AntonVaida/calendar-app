import { ActivityType } from "@/app/shared/types/ActivityType"
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectDates, datesActions } from "@/app/store/dates";
import { DateType } from "@/app/shared/types/DateType";

export const useSideBarActivitiesItem = ({
  activity,
  data
}:{
  activity: ActivityType,
  data: DateType
}) => {
  const dispatch = useAppDispatch();
  const dates = useAppSelector(selectDates);

  const handleDeleteActivity = () => {
    try {
      dispatch(datesActions.deleteActivities({
        dateList: dates,
        date: data?.date,
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
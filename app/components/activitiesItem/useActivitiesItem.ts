import { ActivityType } from "@/app/shared/types/ActivityType"
import { textLimitHelper } from "@/app/utils";

export const useActivitiesItem = ({
  activity
}: {
  activity: ActivityType
}) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const activityTitle = textLimitHelper({text: activity?.title, limit: 16})
  return {
    handleClick,
    activityTitle
  }
}
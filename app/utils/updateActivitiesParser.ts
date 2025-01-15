import { DateType } from "../shared/types/DateType";
import { v4 as uuidv4 } from 'uuid';

export enum UpdateActivitiesTypes {
  CREATE = "create",
  DELETE = "delete"
}

export const updateActivitiesParser = ({
  dateList,
  date, 
  activityId, 
  title, 
  description,
  typeAction
}: {
  dateList: DateType[],
  date: string, 
  activityId?: string, 
  title?: string, 
  description?: string,
  typeAction: UpdateActivitiesTypes
}) => {
  if (typeAction === UpdateActivitiesTypes.CREATE) {
    return dateList?.map(dateData => {
      if (dateData?.date === date) {
        const newActivities = {
          id: uuidv4(),
          title: title ? title : null,
          description: description ? description : null,
          isHoliday: false,
          order: 0,
        }

        return {
          ...dateData,
          activities: [...dateData?.activities, newActivities]
        }
      }

      return dateData;
    });
  }

  return dateList?.map(dateData => {
    if (dateData.date === date && activityId) {
      return {
        ...dateData,
        activities: dateData?.activities?.filter(activityData => activityData?.id !== activityId)
      }
    };

    return dateData;
  })

}
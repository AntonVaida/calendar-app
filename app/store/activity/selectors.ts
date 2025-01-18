import { RootState } from "@/app/shared/types/store/RootState";
import { activityFilter } from "@/app/utils";
import { createSelector} from 'reselect';

export const selectActivityList = ({activities}: RootState) => activities.activityList;

export const selectLoading = ({activities}: RootState) => activities.loading;

export const selectError = ({activities}: RootState) => activities.error;

// export const makeSelectActivityListPerDate = () =>
//   createSelector(
//     [selectActivityList, (_, date: Date) => date],
//     (activityList, date) => {
//       return [...activityFilter({ activityList, date })];
//     }
//   );

  
export const makeSelectActivityListPerDate = (date: Date) => {
  return createSelector(selectActivityList, (activityList) => {
      return activityFilter({ activityList, date })
  });
};
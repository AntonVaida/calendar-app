import { RootState } from "@/app/shared/types/store/RootState";

export const selectDates = ({dates}: RootState) => dates.dates;

export const selectAllHolidayList = ({dates}: RootState) => dates.allHolidayList;

export const selectLoading = ({dates}: RootState) => dates.loading;

export const selectError = ({dates}: RootState) => dates.error;
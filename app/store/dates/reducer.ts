import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/app/shared/types/store/RootState";
import { DateType } from "@/app/shared/types/DateType";
import { holidaysApi } from "@/app/shared/api";
import { calendarDatesParser, updateActivitiesParser, UpdateActivitiesTypes } from "@/app/utils";
import { HolidayType } from "@/app/shared/types/HolidayType";
import { CalendarType } from "@/app/shared/types/CalendarType";

type State = RootState['dates'];

const initialState: State = {
  loading: false,
  allHolidayList: [],
  error: null,
  dates: [],
};

const getAllHolidayList = createAsyncThunk(
  'dates/getAllDatesWithHolidays',
  async (year: number, { dispatch }) => {
    dispatch(datesActions.setLoading(true))
    try {
      const allHolidayList:HolidayType[] = await holidaysApi.getAllHolidaysInCurrentYear(year) || [];
      dispatch(datesActions.setAllHolidayList(allHolidayList))
      console.log("Reducer", {allHolidayList})
    } catch (e: unknown) {
      dispatch(datesActions.setError(e as Error))
    } finally {
      dispatch(datesActions.setLoading(false))
    }
  }
)

const { reducer, actions } = createSlice({
  name: 'dates',
  initialState,
  reducers: {
    setDates: (state, { payload: datesList }: PayloadAction<DateType[]>) => {
      state.dates = datesList;
    },
    setLoading: (state, { payload: loadingStatus }: PayloadAction<boolean>) => {
      state.loading = loadingStatus;
    },
    setAllHolidayList: (state, { payload: holidayList}: PayloadAction<HolidayType[]>) => {
      state.allHolidayList = holidayList;
    },
    setError: (state, { payload: errorStatus }: PayloadAction<Error | null>) => {
      state.error = errorStatus;
    },
    processCalendarDates: (
      state,
      { payload }: PayloadAction<{
        year: number;
        month: number;
        weekCoefficient: number;
        calendarType: CalendarType;
        allHolidayList: HolidayType[]
      }>
    ) => {
      const parsedDatesInformation = calendarDatesParser({...payload });
      state.dates = parsedDatesInformation;
    },
    addNewActivities: (state, { payload }: PayloadAction<{
      date: string, 
      title: string, 
      description: string,
      dateList: DateType[]
    }>) => {
      const {date, title, description, dateList} = payload;

      const updatedDateList = updateActivitiesParser({
        date, 
        title, 
        description, 
        typeAction: UpdateActivitiesTypes.CREATE, 
        dateList 
      });

      state.dates = updatedDateList;
    },
    deleteActivities: (state, { payload }: PayloadAction<{
      dateList: DateType[],
      date: string,
      activityId?: string
    }>) => {
      const { dateList, date, activityId } = payload;

      const updatedDateList = updateActivitiesParser({
        date, 
        typeAction: UpdateActivitiesTypes.DELETE, 
        dateList,
        activityId
      });

      state.dates = updatedDateList;
    }
  },
});

export const datesReducer = reducer;
export const datesActions = {
  ...actions,
  getAllHolidayList
};


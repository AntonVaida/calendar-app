import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/app/shared/types/store/RootState";
import { holidaysApi } from "@/app/shared/api";
import { 
  activityUpdateParser,
} from "@/app/utils";
import { HolidayType } from "@/app/shared/types/HolidayType";
import { ActivityType } from "@/app/shared/types/ActivityType";
import { holidayToActivityParser } from "@/app/utils";
import { v4 as uuidv4 } from 'uuid';
import { selectActivityList } from "./selectors";
import { checkTheSameDay } from "@/app/utils/checkTheSameDay";
import { Over, Active } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { activityFilter } from "@/app/utils";

type State = RootState['activities'];

const initialState: State = {
  loading: false,
  activityList: [],
  error: null,
};

const getAllHolidayList = createAsyncThunk(
  'activities/getAllDatesWithHolidays',
  async (year: number, { dispatch,  getState }) => {
    dispatch(activitiesActions.setLoading(true))
    try {
      const activityList = selectActivityList(getState() as RootState);

      const previouslyYearHolidayList:HolidayType[] = await holidaysApi.getAllHolidaysInCurrentYear(year - 1) || [];
      const currentYearHolidayList:HolidayType[] = await holidaysApi.getAllHolidaysInCurrentYear(year) || [];
      const nextYearHolidayList:HolidayType[] = await holidaysApi.getAllHolidaysInCurrentYear(year + 1) || [];

      const parsedActivityList = holidayToActivityParser({holidayList: [
        ...previouslyYearHolidayList, 
        ...currentYearHolidayList, 
        ...nextYearHolidayList
      ]});

      const updatedActivityList = activityUpdateParser({
        activityList, 
        activitiesFromHoliday: parsedActivityList
      })

      dispatch(activitiesActions.setActivityList(updatedActivityList))
    } catch (e: unknown) {
      dispatch(activitiesActions.setError(e as Error))
    } finally {
      dispatch(activitiesActions.setLoading(false))
    }
  }
)

const { reducer, actions } = createSlice({
  name: 'activities',
  initialState,
  reducers: {
    setLoading: (state, { payload: loadingStatus }: PayloadAction<boolean>) => {
      state.loading = loadingStatus;
    },
    setActivityList: (state, { payload: activityList}: PayloadAction<ActivityType[]>) => {
      state.activityList = activityList;
    },
    setError: (state, { payload: errorStatus }: PayloadAction<Error | null>) => {
      state.error = errorStatus;
    },
    dragAndDrop: (state, { payload }: PayloadAction<{
      active: Active,
      over: Over | null,
      activeActivity: ActivityType | null
    }>) => {
      const { active, over, activeActivity } = payload;
      const activityList = state.activityList;

      if (!over || !activeActivity) return;

      const activeId = active?.id;
      const overId = over?.id;

      if (activeId === overId) return;

      const isActiveAActivity = active.data.current?.type === 'activity';
      const isOverAActivity = over.data.current?.type === 'activity';

      let updatedActivitiesList = [...activityList];

      if (isActiveAActivity && isOverAActivity) {
        const targetDate = over.data.current?.activity?.date;
        const activeActivityData = activityList.find(activity => activity?.id === activeId);
        
        if (!activeActivityData || !targetDate) return;

        updatedActivitiesList = [
          ...updatedActivitiesList.filter(activity => activity?.id !== activeId),
          { ...activeActivityData, date: targetDate }
        ];

        const filteredActivities = activityFilter({ activityList: updatedActivitiesList, date: new Date(targetDate) });
        const overActivityIndex = filteredActivities?.findIndex(activity => activity?.id === overId);
        const activeActivityIndex = filteredActivities?.findIndex(activity => activity?.id === activeId);

        if (
          overActivityIndex === -1 ||
          activeActivityIndex === -1 ||
          over.data.current?.activity?.isHoliday
        ) return;

        const movedActivityList = arrayMove(filteredActivities, activeActivityIndex, overActivityIndex)
          ?.map((activity, index) => ({
            ...activity,
            order: index,
          }));

        const idsUpdatedActivities = movedActivityList?.map(activity => activity?.id);
        const activitiesFilteredList = activityList.filter(activity => !idsUpdatedActivities.includes(activity?.id));

        updatedActivitiesList = [...activitiesFilteredList, ...movedActivityList];
      }

      if (isActiveAActivity && over.data.current?.type === 'date') {
        const targetDate = over.data.current?.date || null;
        const activeActivityData = activityList.find(activity => activity?.id === activeId);

        if (!targetDate || !activeActivityData) return;

        updatedActivitiesList = [
          ...updatedActivitiesList.filter(activity => activity?.id !== activeId),
          { ...activeActivityData, date: targetDate }
        ];
      }

      state.activityList = updatedActivitiesList;
    },
    addNewActivities: (state, { payload }: PayloadAction<{
      date: string, 
      title: string, 
      description: string,
      activityList: ActivityType[]
    }>) => {
      const {date, title, description, activityList} = payload;

      const activityPerDataList = activityList.filter((activity: ActivityType) => {
        return activity?.date && checkTheSameDay({  firstDate: new Date(activity?.date), secondDate: new Date(date)})
      });

      const newActivity = {
        id: uuidv4(),
        title,
        description,
        date,
        isHoliday: false,
        order: activityPerDataList?.length
      }

      state.activityList = [...activityList, newActivity].sort((activityA, activityB) => activityA?.order - activityB?.order);
    },
    deleteActivities: (state, { payload }: PayloadAction<{
      activityId?: string,
      activityList: ActivityType[]
    }>) => {
      const { activityList, activityId } = payload;

      const filteredActivityList = activityList?.filter(activity => activity?.id !== activityId);
      state.activityList = filteredActivityList.sort((activityA, activityB) => activityA?.order - activityB?.order);
    }
  },
});

export const activitiesReducer = reducer;
export const activitiesActions = {
  ...actions,
  getAllHolidayList
};


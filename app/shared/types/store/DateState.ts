import { DateType } from "../DateType";
import { HolidayType } from "../HolidayType";

export type DateState = {
  loading: boolean,
  error: Error | null,
  dates: DateType[]
  allHolidayList: HolidayType[]
}
import { HolidayType } from "../shared/types/HolidayType";
import { v4 as uuidv4 } from 'uuid';

export const holidayToActivityParser = ({
  holidayList 
}: {
  holidayList: HolidayType[]
}) => {
  return holidayList?.map(holiday => ({
    date: holiday?.date,
    id: uuidv4(),
    title: holiday?.name,
    description: '',
    isHoliday: true,
    order: 0,
  }))
}
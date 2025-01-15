import { api } from "./instance";

export const holidaysApi = {
  async getAllHolidaysInCurrentYear(year: number, country: string = 'UA') {
    const HOLIDAYS_URL = `https://date.nager.at/api/v3/PublicHolidays/${year}/${country}`
    const res = await api.get(HOLIDAYS_URL);
    return res?.data;
  },
}
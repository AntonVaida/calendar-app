export type ActivityType = {
  id: string,
  date?: string,
  title: string | null,
  description?: string | null,
  isHoliday: boolean,
  order: number,
}
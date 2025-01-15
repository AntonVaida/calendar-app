export enum HolidayTypesEnum {
  PUBLIC = 'Public',
  BANK = 'Bank',
  SCHOOL = 'School',
  AUTHORITIES = 'Authorities',
  OPTIONAL = 'Optional',
  OBSERVANCE = 'Observance'
}

export type HolidayType = {
  date: string,
  localName: string | null, 
  name: string  | null,
  countryCode: string | null, 
  global: boolean,
  counties: string | null,
  launchYear: number | null,
  types: HolidayTypesEnum[]
}
"use client"
import { Dispatch, SetStateAction } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { CalendarType } from '@/app/shared/types/CalendarType';
import { SelectChangeEvent } from '@mui/material/Select';

const menuItemList = [
  {value: CalendarType.MONTH, title: "Місяць"},
  {value: CalendarType.WEEK, title: "Тиждень"}
]

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    width: "100px",
    borderRadius: "20px",
    position: 'relative',
    backgroundColor: theme.palette.primary.light,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.palette.secondary.dark,
    fontSize: 16,
    display: "flex",
    justifyContent: "center", 
    alignItems: "center",
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: "20px",
    },
  },
}));


export const SelectCalendarMode = ({
  calendarType,
  onChange
}: {
  calendarType: CalendarType,
  onChange: Dispatch<SetStateAction<CalendarType>>;
}) => {

  const onChangeHandler = (e: SelectChangeEvent<CalendarType>) => {
    onChange(e?.target?.value as CalendarType)
  }

  return (
    <Select
      labelId="demo-customized-select-label"
      id="demo-customized-select"
      value={calendarType}
      input={<BootstrapInput />}
      onChange={onChangeHandler}
    >
      {menuItemList?.map((menuItemData, index) => (
        <MenuItem key={index} value={menuItemData?.value}>{menuItemData?.title}</MenuItem>
      ))}
    </Select>
  )
}
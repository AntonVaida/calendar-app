import Grid from '@mui/material/Grid2';
import { DaysOfTheWeekGridItem } from '../daysOfTheWeekGridItem';

const daysOfTheWeekList = ["НД", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"]

export const DaysOfTheWeekGrid = () => {
  return (
    <Grid 
      sx={{
        boxSizing: "border-box",
        height: "30px",
      }} 
      container
      columns={7}
    >
      {daysOfTheWeekList?.map((data, index) => (
        <DaysOfTheWeekGridItem data={data} index={index} key={index} />
      ))}
    </Grid>
  )
}
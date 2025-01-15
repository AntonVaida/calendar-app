import Grid from '@mui/material/Grid2';
import { Box, Typography } from '@mui/material';

export const DAYS_OF_WEEK_HEIGHT = 30

export const DaysOfTheWeekGridItem = ({
  data, 
  index,
}: {
  data: string, 
  index: number,
}) => {
  return (
    <Grid 
      size={1} 
      key={index} 
      sx={(theme) => ({
        height: "30px",
        backgroundColor: theme.palette.primary.light,
        borderLeft: index === 0 ? "0px" : "1px",
        borderRight: index === 6 ?  "0px" : "1px",
        borderBottom: "0px",
        borderTop: "0px",
        borderColor: theme.palette.secondary.dark,
        borderStyle: "solid",
      })}
    >
      <Box sx={{
        height: `${DAYS_OF_WEEK_HEIGHT}px`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <Box sx={(theme) => ({
          height: "25px",
          width: "25px",
          borderRadius: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: "border-box",
          backgroundColor: theme.palette.primary.light,
        })}>  
          <Typography variant={"body1"}>
            {data}
          </Typography>
        </Box>
      </Box>
    </Grid>
  )
}
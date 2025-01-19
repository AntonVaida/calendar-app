import { Box } from "@mui/material"
import { useEmptyActivityItem } from "./useEmptyActivityItem";

export const EmptyActivityItem = ({date}: {date: Date}) => {

  const { aboutToDrop, ref} = useEmptyActivityItem({date})

  return (
    <Box 
      ref={ref}
      sx={{
        flexGrow: 1,
        paddingTop: "5px",
      }}>
      {aboutToDrop ? (
        <Box sx={(theme) => ({
            height: "3px",
            width: "100%",
            backgroundColor: theme.palette.secondary.light,
            borderRadius: "2px"
          })} />
      ) : null}
    </Box>
  )
}
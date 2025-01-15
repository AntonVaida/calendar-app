import { Button, Typography} from "@mui/material"

export const SaveButton = ({
  onClick
}: {
  onClick: () => void
}) => {
  return (
    <Button 
      variant="contained" 
      onClick={onClick}
      sx={(theme) => ({
        height: "48px",
        width: "100%",
        backgroundColor: theme.palette.primary.dark,
        borderRadius: "15px",
        "&:hover": {
          backgroundColor: theme.palette.secondary.main,
        },
      })}
    >
      <Typography variant="body2">
        Save
      </Typography>
    </Button>
  )
}
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';


export const ArrowForwardButton = ({
  onClick
}: {
  onClick: () => void
}) => {
  return (
    <IconButton aria-label="arrow_back" size="small" onClick={onClick}>
      <ArrowForwardIosIcon fontSize="inherit" />
    </IconButton>
  )
}
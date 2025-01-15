import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import IconButton from '@mui/material/IconButton';


export const ArrowBackButton = ({
  onClick
}: {
  onClick: () => void
}) => {
  return (
    <IconButton aria-label="arrow_back" size="small" onClick={onClick}>
      <ArrowBackIosNewIcon fontSize="inherit" />
    </IconButton>
  )
}
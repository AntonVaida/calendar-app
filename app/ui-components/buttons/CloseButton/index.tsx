import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

export const CloseButton = ({
  onClick
}: {
  onClick: () => void
}) => {
  return (
    <IconButton aria-label="arrow_back" size="small" onClick={onClick}>
      <CloseIcon fontSize="inherit" />
    </IconButton>
  )
}
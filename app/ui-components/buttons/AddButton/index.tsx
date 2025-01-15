import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';

export const AddButton = ({
  onClick
}: {
  onClick: () => void
}) => {
  return (
    <IconButton aria-label="arrow_back" size="small" onClick={onClick}>
      <AddIcon fontSize="inherit" />
    </IconButton>
  )
}
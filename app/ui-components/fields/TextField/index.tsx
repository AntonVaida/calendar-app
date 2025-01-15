import TextField from '@mui/material/TextField';
import { UseFormRegister, FieldError } from 'react-hook-form';
import { Inputs } from '@/app/components/dayModal/useDayModal';

export const TextFieldInput = ({
  register, 
  required, 
  name,
  error
}: {
  register: UseFormRegister<Inputs>, 
  required: boolean, 
  name: keyof Inputs,
  error?: FieldError
}) => {
  return (
    <TextField
      {...register(name, { required })}
      id="outlined-text-field"
      placeholder="Title"
      maxRows={1}
      sx={(theme) => ({
        height: "48px",
        width: "100%",
        backgroundColor: theme.palette.primary.light,
        "& .MuiOutlinedInput-root": {
            borderRadius: "15px",
            transition: "border-color 0.3s",

            "&:hover fieldset": {
              borderColor: error ? theme.palette.error.main : theme.palette.primary.dark,
            },

            "&.Mui-focused fieldset": {
              borderColor: error ? theme.palette.error.main : theme.palette.secondary.main,
              borderWidth: "2px",
            },
          },

          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: error ? theme.palette.error.main : theme.palette.primary.dark,
            borderWidth: "2px",
          },
      })}
    />
  )
}
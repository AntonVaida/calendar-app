import { Box } from '@mui/material';
import { TextFieldInput, TextAreaFieldInput } from '../../ui-components';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Inputs } from '../dayModal/useDayModal';

export const AddActivitiesFormFields = ({
  register, 
  errors,
}: {
  register: UseFormRegister<Inputs>, 
  errors: FieldErrors<Inputs>
}) => {
  return (
    <Box>
      <Box>
        <TextFieldInput 
          register={register} 
          name={'title'} 
          required={true}
          error={errors?.title}
        />
      </Box>
      <Box sx={{
        marginTop: "15px"
      }}>
        <TextAreaFieldInput
          register={register} 
          name={'description'} 
          required={true}
          error={errors?.description}
        />
      </Box>
    </Box>
  )
}
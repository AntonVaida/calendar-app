"use client"
import { Typography, Box } from "@mui/material";
import Modal from '@mui/material/Modal';
import { useDayModal } from "./useDayModal";
import { AddActivitiesFormFields } from "../addActivitiesFormFields";
import { SaveButton } from "../../ui-components";
import { CloseButton } from "../../ui-components";

export const DayModal = ({
  isOpen, 
  handleClose,
  date
}: {
  isOpen: boolean,
  handleClose: () => void
  date: Date
}) => {
  const {
    register, 
    submitHandler, 
    errors,
  } = useDayModal({date, handleClose});

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={(theme) => ({
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        backgroundColor: theme.palette.primary.main,
        boxShadow: 24,
        padding: "20px",
        borderRadius: "20px",
        outline: "none",
      })}>
         <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
         >
          <Box onClick={() => submitHandler()}>
            <Typography variant="caption">
              Create New Activity
            </Typography>
          </Box>
          <CloseButton onClick={handleClose} />
         </Box>
         <Box sx={{
            marginTop: "20px"
         }}>
            <AddActivitiesFormFields 
              register={register} 
              errors={errors} 
            />
         </Box>
         <Box sx={{
          marginTop: "20px"
         }}>
            <SaveButton onClick={submitHandler} />
         </Box>
      </Box>
    </Modal>
  )
}
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Box, Typography } from '@mui/material';
import { DateType } from '../../shared/types/DateType';
import { useSideBar } from './useSideBar';
import { AddButton, CloseButton } from '@/app/ui-components';
import { DayModal } from '../dayModal';
import { SideBarActivitiesItem } from '../sideBarActivitiesItem';

export const SideBar = ({
  isOpen, 
  handleSideBarClose, 
  handleSideBarOpen, 
  data
}: {
  isOpen: boolean, 
  handleSideBarClose: () => void, 
  handleSideBarOpen: () => void,
  data: DateType
}) => {
  const { 
    formattedDate, 
    isModalOpen,
    openModalHandler,
    closeModalHandler 
  } = useSideBar({data});

  return (
    <>
      <DayModal
        isOpen={isModalOpen} 
        handleClose={closeModalHandler}
        data={data}
      />
      <SwipeableDrawer
        anchor={'right'}
        open={isOpen}
        onClose={handleSideBarClose}
        onOpen={handleSideBarOpen}
      >
        <Box sx={(theme) => ({
          height: "100vh",
          width: "300px",
          backgroundColor: theme.palette.primary.main,
          paddingTop: "20px",
          paddingBottom: "20px",
          paddingLeft: "15px",
          paddingRight: "15px"
        })}>
          <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "28px",
          }}>
            <AddButton onClick={openModalHandler} />
            <Typography id="modal-modal-title" variant="caption">
              {formattedDate}
            </Typography>
            <CloseButton onClick={handleSideBarClose} />
          </Box>
          <Box sx={{
            marginTop: "20px",
            height: "100%",
            overflowY: "auto",
            overflowX: "hidden",
            boxSizing: "border-box",
          }}>
            {data?.activities?.map((activity, index) => (
              <SideBarActivitiesItem activity={activity} key={index} data={data} />
            ))}
          </Box>
        </Box>
      </SwipeableDrawer>
    </>
  )
}
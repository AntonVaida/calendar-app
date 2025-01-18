import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Box, Typography } from '@mui/material';
import { useSideBar } from './useSideBar';
import { AddButton, CloseButton } from '@/app/ui-components';
import { DayModal } from '../dayModal';
import { SideBarActivitiesItem } from '../sideBarActivitiesItem';
import { useDroppable } from '@dnd-kit/core';

export const SideBar = ({
  isOpen, 
  handleSideBarClose, 
  handleSideBarOpen, 
  date
}: {
  isOpen: boolean, 
  handleSideBarClose: () => void, 
  handleSideBarOpen: () => void,
  date: Date
}) => {
  const { 
    formattedDate, 
    isModalOpen,
    openModalHandler,
    closeModalHandler,
    filteredActivities
  } = useSideBar({date});

  return (
    <>
      <DayModal
        isOpen={isModalOpen} 
        handleClose={closeModalHandler}
        date={date}
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
          <Box 
            sx={{
              marginTop: "20px",
              height: "100%",
              overflowY: "auto",
              overflowX: "hidden",
              boxSizing: "border-box",
            }}
          >
            {/* {filteredActivities?.map((activity, index) => (
              <SideBarActivitiesItem activity={activity} key={index} />
            ))} */}
          </Box>
        </Box>
      </SwipeableDrawer>
    </>
  )
}
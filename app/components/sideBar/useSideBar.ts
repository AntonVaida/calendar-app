import { useState } from "react";
import { useAppSelector } from "@/app/hooks";
import { selectActivityList } from "@/app/store/activity";
import { activityFilter } from "@/app/utils";

const options: Intl.DateTimeFormatOptions = {
  day: 'numeric', 
  month: 'long', 
  year: 'numeric'
}

export const useSideBar = ({date}: {date: Date}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const activityList = useAppSelector(selectActivityList);
  const filteredActivities = activityFilter({activityList, date})

  const formattedDate = new Intl.DateTimeFormat("uk-UA", options).format(date);

  const openModalHandler = () => {
    setIsModalOpen(true);
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  return {
    formattedDate,
    isModalOpen,
    openModalHandler,
    closeModalHandler,
    filteredActivities
  };
}
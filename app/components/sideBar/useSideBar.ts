import { useState } from "react";
import { DateType } from "../../shared/types/DateType";

const options: Intl.DateTimeFormatOptions = {
  day: 'numeric', 
  month: 'long', 
  year: 'numeric'
}

export const useSideBar = ({data}: {data: DateType}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const date = new Date(data?.date)
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
    closeModalHandler
  };
}
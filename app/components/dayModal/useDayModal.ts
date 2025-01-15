import { useForm } from "react-hook-form";
import { DateType } from "@/app/shared/types/DateType";
import { datesActions } from "@/app/store/dates";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectDates } from "@/app/store/dates";

export type Inputs = {
  title: string,
  description: string
}

export const useDayModal = ({data, handleClose}: {data: DateType, handleClose: () => void}) => {
  const dispatch = useAppDispatch();
  const dates = useAppSelector(selectDates);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm<Inputs>({
    defaultValues: {title: "", description: ""}
  })

  const submitHandler = handleSubmit((submitData) => {
    try {
      const { title, description } = submitData;
      dispatch(datesActions.addNewActivities({title, description, date: data?.date, dateList: dates}));
    } catch (e: unknown) {
      console.error(e)
    } finally {
      reset();
      handleClose();
    }
  })

  return {
    register, 
    submitHandler, 
    errors,
    watch
  };
}
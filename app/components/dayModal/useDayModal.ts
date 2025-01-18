import { useForm } from "react-hook-form";
import { activitiesActions } from "@/app/store/activity";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectActivityList } from "@/app/store/activity";

export type Inputs = {
  title: string,
  description: string
}

export const useDayModal = ({date, handleClose}: {date: Date, handleClose: () => void}) => {
  const dispatch = useAppDispatch();
  const activityList = useAppSelector(selectActivityList);

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
      dispatch(activitiesActions.addNewActivities({title, description, date: date.toISOString(), activityList}));
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
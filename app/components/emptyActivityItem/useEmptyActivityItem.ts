import { useRef, useState, useEffect} from "react";
import { useAppDispatch } from "@/app/hooks";
import { activitiesActions } from "@/app/store/activity";
import { formatDateToISO } from "@/app/utils";
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';

export const useEmptyActivityItem = ({date}: {date: Date}) => {
  const ref = useRef(null);
  const dispatch = useAppDispatch();
  const [aboutToDrop, setAboutToDrop] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const dropConfig = {
      element,
      getData() {
        return { date };
      },
      onDragEnter() {
        setAboutToDrop(true)
      },
      onDragLeave() {
        setAboutToDrop(false)
      },

      // @ts-expect-error payload
      onDrop(payload){
        const {self, source} = payload;
        setAboutToDrop(false)
        const target = self?.data
        dispatch(activitiesActions.dragAndDrop({
          draggableItem: source?.data, 
          targetDate: formatDateToISO(target?.date),
          toNewCalendarDate: true
        }))
      }
    };

    return dropTargetForElements(dropConfig)
  }, [])

  return {
    aboutToDrop,
    ref
  }
}
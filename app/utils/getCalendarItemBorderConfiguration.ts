import { CalendarType } from "../shared/types/CalendarType";


const borderStyleConfiguration = {
  firstRow: {
    borderLeft: "1px",
    borderRight: "1px",
    borderBottom: "1px",
    borderTop: "0px",
  },
  firstRowWeekType: {
    borderLeft: "1px",
    borderRight: "1px",
    borderBottom: "0px",
    borderTop: "0px",
  },
  lastRow: {
    borderLeft: "1px",
    borderRight: "1px",
    borderBottom: "0px",
    borderTop: "1px",
  },
  firstColumn: {
    borderLeft: "0px",
    borderRight: "1px",
    borderBottom: "1px",
    borderTop: "1px",
  },
  lastColumn: {
    borderLeft: "1px",
    borderRight: "0px",
    borderBottom: "1px",
    borderTop: "1px",
  },
  firstRowFirstColumn: {
    borderLeft: "0px",
    borderRight: "1px",
    borderBottom: "1px",
    borderTop: "0px",
  },
  firstRowFirstColumnWeekType: {
    borderLeft: "0px",
    borderRight: "1px",
    borderBottom: "0px",
    borderTop: "0px",
  },
  firstRowLastColumn: {
    borderLeft: "1px",
    borderRight: "0px",
    borderBottom: "1px",
    borderTop: "0px",
  },
  firstRowLastColumnWeekType: {
    borderLeft: "1px",
    borderRight: "0px",
    borderBottom: "0px",
    borderTop: "0px",
  },
  lastRowFirstColumn: {
    borderLeft: "0px",
    borderRight: "1px",
    borderBottom: "0px",
    borderTop: "1px",
  },
  lastRowLastColumn: {
    borderLeft: "1px",
    borderRight: "0px",
    borderBottom: "0px",
    borderTop: "1px",
  }, 
  defaultItem: {
    borderLeft: "1px",
    borderRight: "1px",
    borderBottom: "1px",
    borderTop: "1px",
  }
}


export const getCalendarItemBorderConfiguration = (index: number, calendarType: CalendarType) => {
  let itemStyleKey = "defaultItem";

  if (index >= 0 && index <= 6) {
    if (index === 0) {
      itemStyleKey = calendarType ===  CalendarType.MONTH ? "firstRowFirstColumn" : "firstRowFirstColumnWeekType";
    } else if (index === 6) {
      itemStyleKey = calendarType ===  CalendarType.MONTH ? "firstRowLastColumn" : "firstRowLastColumnWeekType";
    } else {
      itemStyleKey = calendarType ===  CalendarType.MONTH ? "firstRow" : "firstRowWeekType";
    }
  } 

  else if (index >= 28 && index <= 34) {
    if (index === 28) {
      itemStyleKey = "lastRowFirstColumn";
    } else if (index === 34) {
      itemStyleKey = "lastRowLastColumn";
    } else {
      itemStyleKey = "lastRow";
    }
  } 

  else if (index % 7 === 0) {
    itemStyleKey = "firstColumn";
  } 

  else if ((index + 1) % 7 === 0) {
    itemStyleKey = "lastColumn";
  } 

  return borderStyleConfiguration[itemStyleKey as keyof typeof borderStyleConfiguration];
};

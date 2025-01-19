export const checkTheSameDay = ({
  firstDate, 
  secondDate
}: {
  firstDate: Date, 
  secondDate: Date
}) => {
  const getUTCDateParts = (date: Date) => ({
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
  });

  const firstDateParts = getUTCDateParts(firstDate);
  const secondDateParts = getUTCDateParts(secondDate);

  return (
    firstDateParts.year === secondDateParts.year &&
    firstDateParts.month === secondDateParts.month &&
    firstDateParts.day === secondDateParts.day
  );
}
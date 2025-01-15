export const checkTheSameDay = ({
  firstDate, 
  secondDate
}: {
  firstDate: Date, 
  secondDate: Date
}) => {
  return firstDate.getUTCFullYear() === secondDate.getUTCFullYear() &&
  firstDate.getUTCMonth() === secondDate.getUTCMonth() &&
  firstDate.getUTCDate() === secondDate.getUTCDate();
}
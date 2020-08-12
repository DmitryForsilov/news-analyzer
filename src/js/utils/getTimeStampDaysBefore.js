export default (timeStamp, daysBefore = 7) => {
  const date = new Date(timeStamp);
  const currentDay = date.getDate();

  date.setDate(currentDay - daysBefore);

  return Date.parse(date);
};

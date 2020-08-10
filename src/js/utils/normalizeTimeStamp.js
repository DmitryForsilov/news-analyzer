export default (timeStamp) => {
  const date = new Date(timeStamp);
  date.setHours(24, 0, 0, 0);

  return Date.parse(date);
};

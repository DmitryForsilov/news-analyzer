const addPrefix = (num, prefix = '0') => {
  const numLength = num.toString().length;
  const normalizedNum = numLength > 1 ? `${num}` : `${prefix}${num}`;

  return normalizedNum;
};

export default (timeStamp) => {
  const currentDate = new Date(timeStamp);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

  return `${year}-${addPrefix(month)}-${addPrefix(day)}`;
};

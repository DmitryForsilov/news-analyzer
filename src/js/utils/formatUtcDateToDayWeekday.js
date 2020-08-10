export default (utcDate) => {
  const date = new Date(utcDate).toLocaleDateString('ru', {
    weekday: 'short',
    day: '2-digit',
  });

  const separator = ', ';
  const formattedDate = date.split(separator);
  const [first, second] = formattedDate;
  formattedDate[0] = second;
  formattedDate[1] = first;

  return formattedDate.join(separator);
};

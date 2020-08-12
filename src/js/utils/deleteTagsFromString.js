export default (str) => {
  const regExp = /<[\w\W/]*?>/gi;

  return str.replace(regExp, '');
};

export default (str) => {
  const firstChar = str[0].toUpperCase();
  const restChars = str.slice(1).split('')
    .map((char) => char.toLowerCase())
    .join('');

  return firstChar.concat(restChars);
};

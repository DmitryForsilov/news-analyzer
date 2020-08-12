export default (str) => {
  const temp = document.createElement('div');
  temp.textContent = str;

  return temp.innerHTML;
};

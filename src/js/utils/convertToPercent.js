export default (num, maxNum) => {
  const percent = (num / maxNum) * 100;

  return Math.round(percent);
};

import NUMS from '../constants/NUMS.js';

export default (timeStamp, daysBefore = 7) => {
  const daysBeforeInMilliseconds = daysBefore * NUMS.oneDayInMilliseconds;
  const newTimeStamp = timeStamp - daysBeforeInMilliseconds;

  return newTimeStamp;
};

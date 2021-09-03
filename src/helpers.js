export const padStartHour = function (hour) {
  const toPad = hour + '';
  return toPad.padStart(2, '0');
};

export const getCorrectHour = function (hour) {
  const toPad = +hour < 24 ? hour : +hour - 24;

  const hourPadded = padStartHour(toPad);

  return hourPadded;
};

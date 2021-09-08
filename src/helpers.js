export const padStartHour = function (hour) {
  const toPad = hour + '';
  return toPad.padStart(2, '0');
};

export const getCorrectHour = function (hour) {
  const toPad = +hour < 24 ? hour : +hour - 24;

  const hourPadded = padStartHour(toPad);

  return hourPadded;
};

export const convertToMilliseconds = function (sec) {
  return sec * 1000;
};

export const capitalize = function (str) {
  const strArr = str.split(' ');

  const capitalizeArr = strArr.map((word) =>
    word.replace(word[0], word[0].toUpperCase())
  );

  return capitalizeArr.join(' ');
};

export const convertDateToUTC = function (date) {
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
};

export const getLocalTime = function (offset, dateToConvert) {
  let newDate;

  if (!dateToConvert) {
    newDate = new Date();
  } else {
    newDate = dateToConvert;
  }

  const dateUTC = convertDateToUTC(newDate);

  const convertedTime = +dateUTC + +convertToMilliseconds(offset);
  const convertedDate = new Date(convertedTime);

  const year = convertedDate.getFullYear();
  const month = convertedDate.getMonth();
  const date = convertedDate.getDate();
  const hour = convertedDate.getHours();
  const minute = convertedDate.getMinutes();

  return [year, month, date, hour, minute];
};

export const isDay = function (timeOfDay, day1, day2) {
  const [sunrise1, sunset1] = day1;
  const [sunrise2, sunset2] = day2;

  if (
    (timeOfDay >= sunrise1 && timeOfDay <= sunset1) ||
    (timeOfDay >= sunrise2 && timeOfDay <= sunset2)
  ) {
    return 'day';
  } else return 'night';
};

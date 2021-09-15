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
  const second = convertedDate.getSeconds();

  return [year, month, date, hour, minute, second];
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

export const convertToCelsius = function (fahr) {
  const celsius = ((+fahr - 32) * 5) / 9;
  return celsius.toFixed(0);
};

export const convertToFahr = function (celsius) {
  const fahr = (+celsius * 9) / 5 + 32;
  return fahr.toFixed(0);
};

export const convertToMph = function (speed) {
  const mph = +speed * 2.236936;
  return mph.toFixed(0);
};

export const convertToMetersPerSec = function (speed) {
  const ms = +speed * 0.44704;
  return ms.toFixed(0);
};

export const convertToMiles = function (km) {
  const mile = +km * 1.609;
  return mile.toFixed(0);
};

export const convertToKm = function (mile) {
  const km = +mile * 0.6214;
  return km.toFixed(0);
};

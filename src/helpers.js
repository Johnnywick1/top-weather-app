export const convertDateToUTC = (date) =>
  new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
  );

export const getLocalTime = (offset, dateToConvert) => {
  let newDate;

  if (!dateToConvert) {
    newDate = new Date();
  } else {
    newDate = new Date(dateToConvert);
  }

  const dateUTC = convertDateToUTC(newDate);

  const convertedTime = +dateUTC + offset * 1000;
  const convertedDate = new Date(convertedTime);

  const year = convertedDate.getFullYear();
  const month = convertedDate.getMonth();
  const date = convertedDate.getDate();
  const hour = convertedDate.getHours();
  const minute = convertedDate.getMinutes();
  const second = convertedDate.getSeconds();

  return [year, month, date, hour, minute, second];
};

export const convertToCelsius = (fahr) => ((+fahr - 32) * 5) / 9;

export const convertToFahr = (celsius) => (+celsius * 9) / 5 + 32;

export const convertToMiles = (km) => +km * 1.60934;

export const convertToKm = (mile) => +mile * 0.6214;

export const convertToHPa = (psi) => +psi * 68.9475729318;

export const convertToPSI = (hPa) => +hPa * 0.0145037738;

import { convertToMilliseconds, getLocalTime } from '../helpers';

import format from 'date-fns/format';

export const dailyView = (function () {
  const forecastContainer = document.querySelector(
    '.forecast-container--daily'
  );

  const renderDailyForecast = function (dailyWeather, offset) {
    dailyWeather.forEach((day, i) => {
      forecastContainer.append(createForecastElement(day, i, offset));
    });
  };

  const createForecastElement = function (day, index, offset) {
    const timeToConvert = new Date(convertToMilliseconds(day.dt));
    const [year, month, date, hourToUse] = getLocalTime(offset, timeToConvert);

    const dayToDisplay = format(new Date(year, month, date, hourToUse), 'EEEE');
    console.log(day);

    const tempDay = day.temp.day;
    const tempMin = day.temp.min;
    const tempMax = day.temp.max;

    const weatherStatus = day.weather[0].description;
    const weatherStatusMain = day.weather[0].main;

    const rainChance = day.pop;
  };

  return {
    renderDailyForecast,
  };
})();

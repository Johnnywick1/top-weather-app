import { convertToMilliseconds, getLocalTime } from '../helpers';

import format from 'date-fns/format';

export const hourView = (function () {
  const forecastContainer = document.querySelector('.forecast-container');

  const renderHourlyForecast = function (hourlyWeather, offset) {
    hourlyWeather.forEach((hour, i) => {
      forecastContainer.append(createForecastElement(hour, i, offset));
    });
  };

  const createForecastElement = function (hour, index, offset) {
    const timeToConvert = new Date(convertToMilliseconds(hour.dt));
    const [year, month, date, hourToUse] = getLocalTime(offset, timeToConvert);

    const hourToDisplay = format(
      new Date(year, month, date, hourToUse),
      'haaa'
    );

    const temp = hour.temp.toFixed(0);
    const weatherStatus = hour.weather[0].description;
    const weatherStatusMain = hour.weather[0].main;
    const weatherStatusID = hour.weather[0].id;

    const forecastEl = document.createElement('div');
    forecastEl.classList.add('forecast-element');

    const currHourEl = document.createElement('div');
    currHourEl.classList.add('forecast-hour');
    currHourEl.textContent = hourToDisplay;

    const tempEl = document.createElement('div');
    tempEl.classList.add('forecast-temp');

    const tempValueEl = document.createElement('span');
    tempValueEl.classList.add('forecast-temp--value');
    tempValueEl.textContent = temp;
    tempEl.append(tempValueEl);

    const tempUnitEl = document.createElement('span');
    tempUnitEl.classList.add('forecast-temp--unit');
    tempUnitEl.textContent = '°C';
    tempEl.append(tempUnitEl);

    const iconEl = document.createElement('div');
    iconEl.classList.add('forecast-icon');

    forecastEl.append(currHourEl);
    forecastEl.append(tempEl);
    forecastEl.append(iconEl);

    return forecastEl;
  };

  return {
    renderHourlyForecast,
  };
})();

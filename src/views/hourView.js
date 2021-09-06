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
    // Organize appropriate data

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

    // Create and append elements

    const forecastEl = document.createElement('div');
    forecastEl.classList.add('forecast-element');

    const currHourEl = renderHour(hourToDisplay);

    const tempEl = renderTemp(temp);

    const iconEl = renderIcon(weatherStatus);

    forecastEl.append(currHourEl, tempEl, iconEl);

    return forecastEl;
  };

  const renderHour = function (hour) {
    const currHourEl = document.createElement('div');
    currHourEl.classList.add('forecast-hour');
    currHourEl.textContent = hour;

    return currHourEl;
  };

  const renderTemp = function (temp) {
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

    return tempEl;
  };

  const renderIcon = function (weatherDesc) {
    const iconEl = document.createElement('div');
    iconEl.classList.add('forecast-icon');

    return iconEl;
  };

  return {
    renderHourlyForecast,
  };
})();

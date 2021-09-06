import { View } from './View';
import { convertToMilliseconds, getLocalTime } from '../helpers';

import format from 'date-fns/format';

export const hourView = (function () {
  const forecastContainer = document.querySelector('.forecast-container');

  const renderHourlyForecast = function (hourlyWeather, offset) {
    View.clearSpace(forecastContainer);

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
    const status = hour.weather[0].description;
    const statusMain = hour.weather[0].main;
    const statusID = hour.weather[0].id;
    const iconToDisplay = View.getWeatherIcon(statusMain, statusID);
    const rainChance = (hour.pop * 100).toFixed(0);

    // Create and append elements

    const forecastEl = document.createElement('div');
    forecastEl.classList.add('forecast-element');

    const currHourEl = renderHour(hourToDisplay);

    const tempEl = renderTemp(temp);

    const iconEl = renderIcon(iconToDisplay);

    const rainEl = renderRainChance(rainChance);

    forecastEl.append(currHourEl, tempEl, iconEl, rainEl);

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

  const renderIcon = function (iconClass) {
    const iconEl = document.createElement('div');
    iconEl.classList.add('forecast-icon');

    const icon = document.createElement('div');
    icon.classList.add('wi', iconClass);

    iconEl.append(icon);

    return iconEl;
  };

  const renderRainChance = function (rainChance) {
    const rainEl = document.createElement('div');
    rainEl.classList.add('forecast-rain');

    const rainValueEl = document.createElement('span');
    rainValueEl.classList.add('forecast-rain--value');
    rainValueEl.textContent = rainChance;

    const rainUnitEl = document.createElement('span');
    rainUnitEl.classList.add('forecast-rain--unit');
    rainUnitEl.textContent = '%';

    rainEl.append(rainValueEl, rainUnitEl);

    return rainEl;
  };

  return {
    renderHourlyForecast,
  };
})();

import { View } from './View';
import { convertToMilliseconds, getLocalTime } from '../helpers';

import format from 'date-fns/format';

export const dailyView = (function () {
  const renderDailyForecast = function (dailyWeather, offset) {
    const forecastContainer = document.querySelector(
      '.forecast-container--daily'
    );

    View.clearSpace(forecastContainer);

    dailyWeather.forEach((day, i) => {
      forecastContainer.append(createForecastElement(day, i, offset));
    });
  };

  const createForecastElement = function (day, index, offset) {
    const timeToConvert = new Date(convertToMilliseconds(day.dt));
    const [year, month, date, hourToUse] = getLocalTime(offset, timeToConvert);

    const dayToDisplay = format(new Date(year, month, date, hourToUse), 'EEEE');

    const tempDay = day.temp.day.toFixed(0);
    const tempMin = day.temp.min.toFixed(0);
    const tempMax = day.temp.max.toFixed(0);

    const status = day.weather[0].description;
    const statusMain = day.weather[0].main;
    const statusID = day.weather[0].id;
    const iconToDisplay = View.getWeatherIcon(statusMain, statusID);

    const rainChance = (day.pop * 100).toFixed(0);

    // Create Elements

    const forecastEl = document.createElement('div');
    forecastEl.classList.add('forecast-element--daily');

    const dayEl = renderDayValue(dayToDisplay);

    const tempEl = renderTemp(tempDay);

    const iconEl = View.renderIcon(iconToDisplay, status);
    iconEl.classList.add('forecast-icon--daily');

    const rainEl = renderRainChance(rainChance);

    forecastEl.append(dayEl, tempEl, iconEl, rainEl);

    return forecastEl;
  };

  const renderDayValue = function (day) {
    const dayEl = document.createElement('div');
    dayEl.classList.add('forecast-day');
    dayEl.textContent = day;

    return dayEl;
  };

  const renderTemp = function (temp) {
    const tempEl = document.createElement('div');
    tempEl.classList.add('forecast-temp--daily');

    const tempValueEl = document.createElement('span');
    tempValueEl.classList.add('temp-value', 'temp-celsius');
    tempValueEl.textContent = temp;

    const tempUnitEl = document.createElement('span');
    tempUnitEl.classList.add('temp-unit');
    tempUnitEl.textContent = '°C';

    tempEl.append(tempValueEl, tempUnitEl);

    return tempEl;
  };

  const renderRainChance = function (rainChance) {
    const rainEl = document.createElement('div');
    rainEl.classList.add('forecast-rain--daily');

    const rainValueEl = document.createElement('span');
    rainValueEl.classList.add('forecast-rain--value');
    rainValueEl.textContent = rainChance;

    const rainUnitEl = document.createElement('span');
    rainUnitEl.classList.add('forecast-rain--unit');
    rainUnitEl.textContent = '% ';

    const rainIconEl = document.createElement('span');
    rainIconEl.classList.add('forecast-rain--icon', 'wi', 'wi-rain');

    rainEl.append(rainValueEl, rainUnitEl, rainIconEl);

    return rainEl;
  };

  return {
    renderDailyForecast,
  };
})();

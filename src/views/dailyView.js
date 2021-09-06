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
    // Organize appropriate data

    const timeToConvert = new Date(convertToMilliseconds(day.dt));
    const [year, month, date, hourToUse] = getLocalTime(offset, timeToConvert);

    const dayToDisplay = format(new Date(year, month, date, hourToUse), 'EEEE');
    // console.log(day);

    const tempDay = day.temp.day.toFixed(0);
    const tempMin = day.temp.min;
    const tempMax = day.temp.max;

    const weatherStatus = day.weather[0].description;
    const weatherStatusMain = day.weather[0].main;

    const rainChance = day.pop * 100;

    // Create Elements

    const forecastEl = document.createElement('div');
    forecastEl.classList.add('forecast-element--daily');

    const dayEl = renderDayValue(dayToDisplay);

    const tempEl = renderTemp(tempDay);

    const iconEl = renderIcon(weatherStatus);

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
    tempEl.classList.add('forecast-temp');

    const tempValueEl = document.createElement('span');
    tempValueEl.classList.add('forecast-temp--value');
    tempValueEl.textContent = temp;

    const tempUnitEl = document.createElement('span');
    tempUnitEl.classList.add('forecast-temp--unit');
    tempUnitEl.textContent = '°C';

    tempEl.append(tempValueEl, tempUnitEl);

    return tempEl;
  };

  const renderIcon = function (weatherDesc) {
    const iconEl = document.createElement('div');
    iconEl.classList.add('forecast-icon');

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
    renderDailyForecast,
  };
})();

import { View } from './View';
import { convertToMilliseconds, getLocalTime, isDay } from '../helpers';

import format from 'date-fns/format';

export const hourView = (function () {
  const forecastContainer = document.querySelector(
    '.forecast-container--hourly'
  );

  const renderHourlyForecast = function (hourlyWeather, offset, day1, day2) {
    View.clearSpace(forecastContainer);

    hourlyWeather.forEach((hour) => {
      forecastContainer.append(createForecastElement(hour, offset, day1, day2));
    });
  };

  const createForecastElement = function (hour, offset, day1, day2) {
    // Organize appropriate data

    const timeToConvert = new Date(convertToMilliseconds(hour.dt));
    const [year, month, date, hourToUse] = getLocalTime(offset, timeToConvert);

    const hourToDisplay = format(
      new Date(year, month, date, hourToUse),
      'haaa'
    );

    const timeOfDay = isDay(hour.dt, day1, day2);
    const temp = hour.temp.toFixed(0);
    const status = hour.weather[0].description;
    const statusMain = hour.weather[0].main;
    const statusID = hour.weather[0].id;
    const iconToDisplay = View.getWeatherIcon(statusMain, statusID, timeOfDay);
    const rainChance = (hour.pop * 100).toFixed(0);

    // Create and append elements

    const forecastEl = document.createElement('div');
    forecastEl.classList.add('forecast-element--hourly');

    const currHourEl = renderHour(hourToDisplay);

    const tempEl = renderTemp(temp);

    const iconEl = View.renderIcon(iconToDisplay, status);
    iconEl.classList.add('forecast-icon--hourly');

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
    tempEl.classList.add('forecast-temp', 'forecast-temp--hourly');

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

  const renderRainChance = function (rainChance) {
    const rainEl = document.createElement('div');
    rainEl.classList.add('forecast-rain--hourly');

    const rainValueEl = document.createElement('span');
    rainValueEl.classList.add('forecast-rain--value');
    rainValueEl.textContent = rainChance;

    const rainUnitEl = document.createElement('span');
    rainUnitEl.classList.add('forecast-rain--unit');
    rainUnitEl.textContent = '%';

    rainEl.append(rainValueEl, rainUnitEl);

    return rainEl;
  };

  const renderDetails = function (weather) {
    const detailsEl = document.createElement('div');
    detailsEl.classList.add('forecast-details');

    const hourEl = document.createElement('div');
    hourEl.classList.add('forecast-details--time');
    hourEl.textContent = weather.hourToDisplay;

    const statusEl = document.createElement('div');
    statusEl.classList.add('forecast-details--description');
    statusEl.textContent = weather.status;

    const tempEl = document.createElement('div');
    tempEl.classList.add('forecast-details--temp');

    const tempValueEl = document.createElement('span');
    tempValueEl.classList.add('forecast-details--temp-value');
    tempValueEl.textContent = weather.temp;

    const tempUnitEl = document.createElement('span');
    tempUnitEl.classList.add('forecast-details--temp-unit');
    tempUnitEl.textContent = '°C';

    const rainEl = document.createElement('div');
    rainEl.classList.add('forecast-details--rain-chance');
    rainEl.textContent = `Chance of rain: ${weather.rainChance}%`;

    const uvEl = document.createElement('div');
    uvEl.classList.add('forecast-details--uv-index');
    uvEl.textContent = `UV Index: ${weather.uvi}`;

    const humidityEl = document.createElement('div');
    humidityEl.classList.add('forecast-details--humidity');
    humidityEl.textContent = `Humidity: ${weather.humidity}`;

    tempEl.append(tempValueEl, tempUnitEl);

    detailsEl.append(hourEl, statusEl, tempEl, rainEl, uvEl, humidityEl);

    return detailsEl;
  };

  return {
    renderHourlyForecast,
  };
})();

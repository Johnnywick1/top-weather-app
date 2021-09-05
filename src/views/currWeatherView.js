import { capitalize, getLocalTime } from '../helpers';
import format from 'date-fns/format';

export const currWeatherView = (function () {
  const currWeatherContainer = document.querySelector(
    '.current-weather.sub-container'
  );

  const conditionsContainer = document.querySelector(
    '.weather-conditions.sub-container'
  );

  const renderCurrentWeather = function (weather, locationName, offset) {
    const currentWeather = weather;

    const weatherStatus = currentWeather.weather[0].description;
    const weatherStatusMain = currentWeather.weather[0].main;
    const uvi = currentWeather.uvi;
    const windSpeed = currentWeather.wind_speed;
    const heatIndex = currentWeather.feels_like.toFixed(0);
    const humidity = currentWeather.humidity;
    const temp = currentWeather.temp;

    const locationEl = renderLocation(locationName);
    const statusEl = renderWeatherStatus(weatherStatus);
    const tempEl = renderTemp(temp);
    const dateEl = renderDate(offset);
    const timeEl = renderTime(offset);

    currWeatherContainer.append(locationEl, statusEl, tempEl, dateEl, timeEl);

    const indexEl = createConditionElement(
      'heat-index',
      'Feels like ',
      heatIndex,
      '°C'
    );

    const humEl = createConditionElement(
      'humidity',
      'Humidity ',
      humidity,
      '%'
    );

    const speedEl = createConditionElement(
      'wind-speed',
      'Wind Speed ',
      windSpeed,
      'm/s'
    );

    const uvEl = createConditionElement('uv-index', 'UV Index ', uvi);

    conditionsContainer.append(indexEl, humEl, speedEl, uvEl);
  };

  const renderLocation = function (location) {
    const [city, country] = location;

    const locationEl = document.createElement('div');
    locationEl.classList.add('cw--location');
    locationEl.textContent = `${city}, ${country}`;

    return locationEl;
  };

  const renderWeatherStatus = function (status) {
    const statusEl = document.createElement('div');
    statusEl.classList.add('cw--weather-status');
    statusEl.textContent = capitalize(status);

    return statusEl;
  };

  const renderTemp = function (temp) {
    const tempEl = document.createElement('div');
    tempEl.classList.add('cw--temperature');

    const tempValueEl = document.createElement('span');
    tempValueEl.classList.add('cw--temp-value');
    tempValueEl.textContent = temp.toFixed(0);

    const tempUnitEl = document.createElement('span');
    tempUnitEl.classList.add('cw--temp-unit');
    tempUnitEl.textContent = '°C';

    tempEl.append(tempValueEl, tempUnitEl);

    return tempEl;
  };

  const renderDate = function (offset) {
    const [year, month, date] = getLocalTime(offset);

    const dateToDisplay = format(
      new Date(year, month, date),
      'EEEE, do MMM yy'
    );

    const dateEl = document.createElement('div');
    dateEl.classList.add('cw--date');
    dateEl.textContent = dateToDisplay;

    return dateEl;
  };

  const renderTime = function (offset) {
    const [year, month, date, hour, minute] = getLocalTime(offset);

    const timeToDisplay = format(
      new Date(year, month, date, hour, minute),
      'h:maaa'
    );

    const timeEl = document.createElement('div');
    timeEl.classList.add('cw--time');
    timeEl.textContent = timeToDisplay;

    return timeEl;
  };

  const createConditionElement = function (condition, label, value, unit) {
    const el = document.createElement('div');
    el.classList.add('weather-condition', `cw--${condition}`);

    const iconEl = createConditionSubElement('div', [
      'wc--icon',
      `${condition}--icon`,
    ]);

    const labelEl = createConditionSubElement(
      'span',
      ['wc--label', `${condition}--label`],
      label
    );

    const valueEl = createConditionSubElement(
      'span',
      ['wc--value', `${condition}--value`],
      value
    );

    const unitEl = createConditionSubElement(
      'span',
      ['wc--unit', `${condition}--unit`],
      unit
    );

    console.log(unitEl);

    el.append(iconEl, labelEl, valueEl, unitEl);

    return el;
  };

  const createConditionSubElement = function (type, classList, text) {
    const el = document.createElement(type);

    classList.forEach((classVal) => {
      el.classList.add(classVal);
    });

    el.textContent = text;

    return el;
  };

  return {
    renderCurrentWeather,
  };
})();

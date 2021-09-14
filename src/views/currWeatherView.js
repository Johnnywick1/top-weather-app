import { View } from './View';
import { capitalize, getLocalTime, isDay } from '../helpers';

import format from 'date-fns/format';

export const currWeatherView = (function () {
  const currWeatherContainer = document.querySelector('.current-weather');

  const conditionsContainer = document.querySelector('.weather-conditions');

  const renderCurrentWeather = function (currentWeather, locationName, offset) {
    console.log(currentWeather);

    const weatherStatus = currentWeather.weather[0].description;
    const weatherStatusMain = currentWeather.weather[0].main;
    const weatherStatusID = currentWeather.weather[0].id;
    const windSpeed = currentWeather.wind_speed;
    const heatIndex = currentWeather.feels_like.toFixed(0);
    const dewPoint = currentWeather.dew_point;
    const cloudCover = currentWeather.clouds;

    const { uvi, humidity, temp, pressure, visibility } = currentWeather;

    const timeOfDay = isDay(
      currentWeather.dt,
      [currentWeather.sunrise, currentWeather.sunset],
      []
    );

    const iconToDisplay = View.getWeatherIcon(
      weatherStatusMain,
      weatherStatusID,
      timeOfDay
    );

    const iconEl = View.renderIcon(iconToDisplay, weatherStatus);
    iconEl.classList.add('cw--icon');

    const locationEl = renderLocation(locationName);
    const statusEl = renderWeatherStatus(weatherStatus);
    const tempEl = renderTemp(temp);
    const dateEl = renderDate(offset);
    const timeEl = renderTime(offset);

    View.clearSpace(currWeatherContainer);
    currWeatherContainer.append(
      dateEl,
      timeEl,
      iconEl,
      locationEl,
      statusEl,
      tempEl
    );

    const indexEl = View.createConditionElement(
      'thermometer',
      'Feels like  ',
      heatIndex,
      '°C'
    );

    const humEl = View.createConditionElement(
      'humidity',
      'Humidity ',
      humidity,
      '%'
    );

    const speedEl = View.createConditionElement(
      'strong-wind',
      'Wind Speed ',
      windSpeed,
      'm/s'
    );

    const uvEl = View.createConditionElement('sunrise', 'UV Index ', uvi, '');

    const cloudEl = View.createConditionElement(
      'cloudy',
      'Cloud Cover ',
      cloudCover,
      '%'
    );

    const pressureEl = View.createConditionElement(
      'barometer',
      'Pressure ',
      pressure,
      'hPa'
    );

    const dewEl = View.createConditionElement(
      'raindrop',
      'Dew Point ',
      dewPoint,
      '°C'
    );

    const visibilityEl = View.createConditionElement(
      'wind-direction',
      'Visibility ',
      visibility,
      'm'
    );

    View.clearSpace(conditionsContainer);
    conditionsContainer.append(
      indexEl,
      humEl,
      speedEl,
      uvEl,
      cloudEl,
      pressureEl,
      dewEl,
      visibilityEl
    );
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
      'h:mmaaa'
    );

    const timeEl = document.createElement('div');
    timeEl.classList.add('cw--time');
    timeEl.textContent = timeToDisplay;

    return timeEl;
  };

  return {
    renderCurrentWeather,
  };
})();

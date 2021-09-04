import { capitalize } from '../helpers';
import format from 'date-fns/format';

export const currWeatherView = (function () {
  const currWeatherContainer = document.querySelector(
    '.current-weather.sub-container'
  );
  // const locationEl = document.querySelector('.cw--location');
  const tempEl = document.querySelector('.cw--temperature');
  const statusEl = document.querySelector('.cw--weather-status');
  const dateEl = document.querySelector('.cw--date');
  const timeEl = document.querySelector('.cw--time');

  const renderCurrentWeather = function (weather) {
    const currentWeather = weather;

    const weatherStatus = currentWeather.weather[0].description;
    const weatherStatusMain = currentWeather.weather[0].main;
    const uvi = currentWeather.uvi;
    const windSpeed = currentWeather.wind_speed;
    const heatIndex = currentWeather.feels_like;
    const humidity = currentWeather.humidity;
    const temp = currentWeather.temp;

    renderWeatherStatus(weatherStatus);
    renderTemp(temp);
  };

  const renderLocation = function (cityName, countryName) {
    const city = cityName;
    const country = countryName;

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
    // Get an API to render date in proper timezone

    const timeUTC = Date.parse(new Date().toUTCString());
    // const dateUTC = new Date(+newDate);
    console.log('timeUTC', timeUTC);

    const convertedTime = +timeUTC + +offset * 1000;
    console.log('converted', convertedTime);

    const newDate = new Date(convertedTime);
    console.log('newdate', newDate);

    const year = newDate.getFullYear();
    const month = newDate.getMonth();
    const date = newDate.getDate();
    const day = newDate.getDay();
    const hour = newDate.getHours();
    const minute = newDate.getMinutes();

    console.log(hour, minute);

    const toDisplay = format(new Date(year, month, date), 'yyyy MMM dd');
    console.log(toDisplay);

    console.log({ year, month, day, date });
  };

  return {
    renderCurrentWeather,
    renderLocation,
    renderDate,
  };
})();

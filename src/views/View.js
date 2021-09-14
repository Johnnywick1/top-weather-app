import {
  convertToCelsius,
  convertToFahr,
  convertToMph,
  convertToMetersPerSec,
  convertToKm,
  convertToMiles,
} from '../helpers';

export const View = (function () {
  const toggleDaily = document.querySelector('.forecast-toggle--daily');
  const toggleHourly = document.querySelector('.forecast-toggle--hourly');

  const clearSpace = function (parentEl) {
    parentEl.innerHTML = '';
  };

  const getWeatherIcon = function (weatherMain, weatherID, timeOfDay) {
    let icon;

    switch (weatherMain) {
      case 'Thunderstorm':
        icon = 'wi-thunderstorm';
        break;
      case 'Drizzle':
        icon = 'wi-raindrops';
        break;
      case 'Rain':
        icon = 'wi-rain';
        break;
      case 'Clouds':
        switch (weatherID) {
          case 801:
          case 802:
            icon =
              timeOfDay === 'night'
                ? 'wi-night-alt-partly-cloudy'
                : 'wi-day-sunny-overcast';
            break;
          case 803:
            icon = timeOfDay === 'day' ? 'wi-day-cloudy' : 'wi-night-cloudy';
            break;
          default:
            icon = 'wi-cloudy';
            break;
        }
        break;
      case 'Snow':
        icon = 'wi-snow';
        break;
      case 'Mist':
        icon = 'wi-cloudy-gusts';
        break;
      case 'Smoke':
        icon = 'wi-smoke';
        break;
      case 'Haze':
        icon = timeOfDay === 'night' ? 'wi-night-fog' : 'wi-day-haze';
        break;
      case 'Dust':
        icon = 'wi-dust';
        break;
      case 'Fog':
        icon = 'wi-fog';
        break;
      case 'Sand':
        icon = 'wi-sandstorm';
        break;
      case 'Ash':
        icon = 'wi-volcano';
        break;
      case 'Squall':
        icon = 'wi-strong-wind';
        break;
      case 'Tornado':
        icon = 'wi-tornado';
        break;
      case 'Clear':
        icon = timeOfDay === 'night' ? 'wi-night-clear' : 'wi-day-sunny';
        break;
      default:
        icon = 'wi-na';
        break;
    }

    return icon;
  };

  const createConditionElement = function (condition, label, value, unit) {
    const el = document.createElement('div');
    el.classList.add('weather-condition', `cw--${condition}`);

    const iconWrapper = createConditionSubElement('div', [
      'wc--icon',
      `${condition}--label`,
    ]);

    const textWrapper = createConditionSubElement(
      'div',
      ['wc--description'],
      ''
    );

    const valueWrapper = createConditionSubElement('div', [
      'wc--value-wrapper',
    ]);

    const iconEl = document.createElement('i');
    iconEl.classList.add('wi', `wi-${condition}`);
    iconWrapper.append(iconEl);

    const labelEl = createConditionSubElement(
      'span',
      ['wc--label', `${condition}--label`],
      ` ${label} `
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

    valueWrapper.append(valueEl, unitEl);

    textWrapper.append(labelEl, valueWrapper);

    el.append(iconWrapper, textWrapper);

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

  const renderIcon = function (iconClass, status) {
    const iconEl = document.createElement('div');
    iconEl.classList.add('forecast-icon');

    const icon = document.createElement('i');
    icon.classList.add('wi', iconClass);
    icon.setAttribute('aria-label', status);

    iconEl.append(icon);

    return iconEl;
  };

  const addHandlerToggleTempUnits = function () {
    const btnCelsius = document.querySelector('.toggle-units--celsius');
    const btnFahrenheit = document.querySelector('.toggle-units--fahrenheit');

    btnCelsius.addEventListener('click', getFahrenheit);
    btnFahrenheit.addEventListener('click', getCelsius);
  };

  const getCelsius = function (e) {
    const tempValues = document.querySelectorAll('.temp-value');
    const visDistance = document.querySelector('.wind-direction--value');
    const windSpeed = document.querySelector('.strong-wind--value');

    if (!tempValues[0].classList.contains('temp-celsius')) return;

    tempValues.forEach((val) => {
      const tempC = val.textContent;
      val.textContent = convertToFahr(tempC);

      val.classList.remove('temp-celsius');
      val.classList.add('temp-fahrenheit');
    });

    const speed = windSpeed.textContent;
    windSpeed.textContent = convertToMph(speed);

    const vis = visDistance.textContent;
    visDistance.textContent = convertToMiles(vis);

    displayUnitUpdate('celsius');
  };

  const getFahrenheit = function (e) {
    const tempValues = document.querySelectorAll('.temp-value');
    const visDistance = document.querySelector('.wind-direction--value');
    const windSpeed = document.querySelector('.strong-wind--value');

    if (!tempValues[0].classList.contains('temp-fahrenheit')) return;

    tempValues.forEach((val) => {
      const tempF = val.textContent;

      val.textContent = convertToCelsius(tempF);

      val.classList.remove('temp-fahrenheit');
      val.classList.add('temp-celsius');
    });

    const speed = windSpeed.textContent;
    windSpeed.textContent = convertToMetersPerSec(speed);

    const vis = visDistance.textContent;
    visDistance.textContent = convertToKm(vis);

    displayUnitUpdate('fahrenheit');
  };

  const displayUnitUpdate = function (currentUnit) {
    const tempUnits = document.querySelectorAll('.temp-unit');
    const visUnit = document.querySelector('.wind-direction--unit');
    const speedUnit = document.querySelector('.strong-wind--unit');

    if (currentUnit === 'celsius') {
      tempUnits.forEach((unit) => (unit.textContent = '°F'));
      visUnit.textContent = 'mi';
      speedUnit.textContent = 'mph';
    } else if (currentUnit === 'fahrenheit') {
      tempUnits.forEach((unit) => (unit.textContent = '°C'));
      visUnit.textContent = 'km';
      speedUnit.textContent = 'm/s';
    }
  };

  return {
    clearSpace,
    getWeatherIcon,
    createConditionElement,
    createConditionSubElement,
    renderIcon,
    addHandlerToggleTempUnits,
    // addHandlerToggleForecast,
  };
})();

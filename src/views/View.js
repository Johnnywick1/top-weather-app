import {
  convertToCelsius,
  convertToFahr,
  convertToMph,
  convertToMetersPerSec,
  convertToKm,
  convertToMiles,
} from '../helpers';

export const View = (function () {
  const clearSpace = function (...parentEl) {
    parentEl.forEach((el) => (el.innerHTML = ''));
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

  const renderError = function (message) {
    const errorEl = document.querySelector('.error-message');
    const spinnerEl = document.querySelector('.spinner-container');

    errorEl.classList.remove('hidden');
    errorEl.textContent = message;

    setTimeout(makeHidden.bind(null, errorEl), 7500);

    if (spinnerEl) {
      spinnerEl.classList.add('hidden');
    }

    return errorEl;
  };

  const makeHidden = function (element) {
    element.classList.add('hidden');

    return element;
  };

  const renderSpinner = function (parentEl) {
    const mainContainer = document.querySelector('.content-container');

    const container1 = document.querySelector('.weather-conditions');
    const container2 = document.querySelector('.current-weather');
    const container3 = document.querySelector('.forecast-container');
    const container4 = document.querySelector('.weather-settings');

    clearSpace(container1, container2, container3, container4);

    const spinnerContainer = document.createElement('div');
    spinnerContainer.classList.add('spinner-container');

    const spinner = document.createElement('div');
    spinner.classList.add('spinner');

    const loadingMessage = document.createElement('div');
    loadingMessage.classList.add('spinner-message');
    loadingMessage.textContent = 'Retrieving data';

    spinnerContainer.append(spinner, loadingMessage);

    for (let i = 0; i < 8; i++) {
      const spinBubble = document.createElement('div');
      spinBubble.classList.add(`spin-${i}`);
      spinner.append(spinBubble);
    }

    mainContainer.append(spinnerContainer);
  };

  const appendContainers = function () {
    const container = document.querySelector('.content-container');

    clearSpace(container);

    container.innerHTML = `
    
     <div class="weather-container">
       <div class="query-wrapper">
        <form action="" class="weather-form">
          <div class="search-icon">
            <i class="bi bi-search"></i>
          </div>
          <input
            type="search"
            class="weather-query"
            placeholder="Search for location"
          />
          <input type="hidden" class="weather-hidden-input" />
        </form>

        <div class="error-message-wrapper">
          <span class="error-message hidden">Error</span>
        </div>
        </div>



        <div class="current-weather">
        </div>

        <div class="weather-conditions">
        </div>

        <div class="weather-settings">
         <div class="toggle-units">
            <span class="toggle-units--label">Temperature unit:</span>
            <button class="toggle-units--celsius" data-unit="c">°C</button>
            <span class="toggle-units--separator">/</span>
            <button class="toggle-units--fahrenheit" data-unit="f">°F</button>
          </div>
        </div>

      </div>


      <div class="forecast-container">
        <div class="forecast-daily--label">Weekly Forecast</div>
        <div class="forecast-container--daily">
        </div>

        <div class="forecast-hourly--label">Hourly Forecast</div>
        <div class="forecast-container--hourly">
        </div>
      </div>
    `;
  };

  return {
    clearSpace,
    getWeatherIcon,
    createConditionElement,
    createConditionSubElement,
    renderIcon,
    addHandlerToggleTempUnits,
    renderError,
    renderSpinner,
    appendContainers,
  };
})();

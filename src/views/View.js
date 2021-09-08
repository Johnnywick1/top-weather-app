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
        // switch (weatherID) {
        //   case 500:
        //   case 501:
        //     icon = 'wi-showers';
        //     break;
        //   case 503:
        //   case 504:
        //   case 522:
        //     icon = 'wi-rain-wind';
        //     break;
        //   default:
        //     icon = 'wi-rain';
        //     break;
        // }

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

  const renderIcon = function (iconClass, status) {
    const iconEl = document.createElement('div');
    iconEl.classList.add('forecast-icon');

    const icon = document.createElement('i');
    icon.classList.add('wi', iconClass);
    icon.setAttribute('aria-label', status);

    iconEl.append(icon);

    return iconEl;
  };

  const addHandlerToggleForecast = function () {
    const dailyForecast = document.querySelector('.forecast-container--daily');
    const hourlyForecast = document.querySelector(
      '.forecast-container--hourly'
    );

    toggleDaily.addEventListener('click', function () {
      dailyForecast.classList.remove('hidden');
      hourlyForecast.classList.add('hidden');
    });

    toggleHourly.addEventListener('click', function () {
      dailyForecast.classList.add('hidden');
      hourlyForecast.classList.remove('hidden');
    });
  };

  return {
    clearSpace,
    getWeatherIcon,
    createConditionElement,
    createConditionSubElement,
    renderIcon,
    addHandlerToggleForecast,
  };
})();

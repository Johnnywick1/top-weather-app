export const View = (function () {
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
        switch (weatherID) {
          case 500:
            icon = 'wi-sprinkle';
            break;
          case 501:
            icon = 'wi-showers';
            break;
          case 503:
          case 504:
          case 522:
            icon = 'wi-rain-wind';
            break;
          default:
            icon = 'wi-rain';
            break;
        }
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

  return {
    clearSpace,
    getWeatherIcon,
  };
})();

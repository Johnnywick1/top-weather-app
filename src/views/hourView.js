import { getCorrectHour, convertToMilliseconds } from '../helpers';

export const hourView = (function () {
  const forecastContainer = document.querySelector('.forecast-container');

  const renderHourlyForecast = function (hourlyWeather) {
    hourlyWeather.forEach((hour, i) => {
      forecastContainer.append(createForecastElement(hour, i));
    });
  };

  const createForecastElement = function (hour, index) {
    const date = new Date(convertToMilliseconds(hour.dt));
    const toCorrect = date.getHours();
    const hourToDisplay = getCorrectHour(toCorrect);

    const currHourEl = document.createElement('span');
    currHourEl.classList.add('forecast');

    return currHourEl;
  };

  return {
    renderHourlyForecast,
  };
})();

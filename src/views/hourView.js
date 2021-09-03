import { getCorrectHour } from '../helpers';

export const hourView = (function () {
  const displayHourlyWeather = async function (weather) {
    const hourlyWeather = await weather;
    hourlyWeather.forEach((hour, i) => {
      _createWeatherDiv(i);
    });
  };

  const _createWeatherDiv = function (index) {
    const date = new Date();
    const toCorrect = +date.getHours() + +index;
    const hourToDisplay = getCorrectHour(toCorrect);

    const forecastContainer = document.querySelector('.forecast-container');

    const currHourEl = document.createElement('span');
    currHourEl.textContent = hourToDisplay;
    currHourEl.classList.add('forecast');

    forecastContainer.append(currHourEl);
  };

  return {
    displayHourlyWeather,
  };
})();

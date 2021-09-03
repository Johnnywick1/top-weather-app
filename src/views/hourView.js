import { getCorrectHour } from '../helpers';

export const hourView = (function () {
  const displayHourlyWeather = async function (weather) {
    const hourlyWeather = await weather;
    hourlyWeather.forEach((hour, i) => {
      console.log(hour);
      _createWeatherDiv(i);
    });
  };

  const _createWeatherDiv = function (index) {
    const date = new Date();
    const toCorrect = +date.getHours() + +index;
    const hourToDisplay = getCorrectHour(toCorrect);

    const hourlyWeatherContainer = document.querySelector('.weather-container');

    const currHourEl = document.createElement('span');
    currHourEl.textContent = hourToDisplay;
    currHourEl.style.padding = '0.5rem';

    hourlyWeatherContainer.append(currHourEl);
  };

  return {
    displayHourlyWeather,
  };
})();

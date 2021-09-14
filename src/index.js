import { model } from './model';
import { View } from './views/View';
import { hourView } from './views/hourView';
import { currWeatherView } from './views/currWeatherView';
import { dailyView } from './views/dailyView';
import { queryView } from './views/queryView';

const defaultLocation = 'London';

const controlWeatherDisplay = async function (location) {
  try {
    const container = document.querySelector('.content-container');

    // 0 Render spinner
    View.renderSpinner();

    // 1 Get the city and country name
    const locationName = await model.getCityAndCountry(location);

    // 2 Get the aggregate weather data for the location
    const locationWeather = await model.getWeather(location);

    // 3 Get the appropriate weather data
    const currentWeather = locationWeather.current;
    const dailyWeather = locationWeather.daily.slice(1);
    const hourlyWeather = locationWeather.hourly.slice(1, 25);

    // 4 Get the timezone offset for displaying date
    const timezoneOffset = locationWeather.timezone_offset;

    // 5 Get the sunrise and sunset data;
    const day1 = [
      locationWeather.daily[0].sunrise,
      locationWeather.daily[0].sunset,
    ];

    const day2 = [
      locationWeather.daily[1].sunrise,
      locationWeather.daily[1].sunset,
    ];

    //  6 Display the results

    View.appendContainers();

    currWeatherView.renderCurrentWeather(
      currentWeather,
      locationName,
      timezoneOffset
    );

    hourView.renderHourlyForecast(hourlyWeather, timezoneOffset, day1, day2);

    dailyView.renderDailyForecast(dailyWeather, timezoneOffset);

    // 7 Add handlers
    View.addHandlerToggleTempUnits();
    queryView.addHandlerGetQuery(controlWeatherDisplay);
  } catch (err) {
    console.error(err);

    View.renderError(err.message);
  }
};

const controlGetLocation = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      controlPositionWeather,
      controlWeatherDisplay.bind(null, defaultLocation)
    );
  } else {
    throw new Error('Geolocation is not supported by this browser.');
  }
};

const controlPositionWeather = async function (position) {
  const { latitude, longitude } = position.coords;

  const location = await model.getPositionName(latitude, longitude);

  controlWeatherDisplay(location);
};

const init = function () {
  controlGetLocation();
  console.log('init');
};

init();

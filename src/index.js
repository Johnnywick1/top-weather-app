import { model } from './model';
import { View } from './views/View';
import { hourView } from './views/hourView';
import { currWeatherView } from './views/currWeatherView';
import { dailyView } from './views/dailyView';
import { queryView } from './views/queryView';

//  TESTING

const getWeatherData = async function (location) {
  try {
  } catch (err) {
    console.error('controlweatherdata', err);
  }
};

const controlCurrentWeather = async function (location) {
  try {
    // 1 Get the city and country name
    const locationName = await model.getCityAndCountry(location);

    // 2 Get the aggregate weather data for the location
    const locationWeather = await model.getWeather(location);

    // 3 Get the current weather data only
    const currentWeather = locationWeather.current;

    // 4 Get the timezone offset for displaying date
    const timezoneOffset = locationWeather.timezone_offset;

    //  4 Display the results
    currWeatherView.renderCurrentWeather(
      currentWeather,
      locationName,
      timezoneOffset
    );

    View.addHandlerToggleTempUnits();
  } catch (err) {
    console.error('controlcurrentweather', err);
  }
};

const controlHourlyForecast = async function (location) {
  try {
    const locationWeather = await model.getWeather(location);

    const hourlyWeather = locationWeather.hourly.slice(1, 25);

    const timezoneOffset = locationWeather.timezone_offset;

    const day1 = [
      locationWeather.daily[0].sunrise,
      locationWeather.daily[0].sunset,
    ];

    const day2 = [
      locationWeather.daily[1].sunrise,
      locationWeather.daily[1].sunset,
    ];

    hourView.renderHourlyForecast(hourlyWeather, timezoneOffset, day1, day2);
  } catch (err) {
    console.error('controlhourlyforecast', err.message);
  }
};

const controlDailyForecast = async function (location) {
  try {
    const locationWeather = await model.getWeather(location);

    const dailyWeather = locationWeather.daily.slice(1);

    const timezoneOffset = locationWeather.timezone_offset;

    dailyView.renderDailyForecast(dailyWeather, timezoneOffset);
  } catch (err) {
    console.error('controldailyforecast', err.message);
  }
};

const controlGetQuery = function (location) {
  controlCurrentWeather(location);
  controlHourlyForecast(location);
  controlDailyForecast(location);
};

const controlAddHandlerQuery = function () {
  queryView.addHandlerGetQuery(controlGetQuery);
};

const controlPlaceholderWeather = function (initLoc = 'London') {
  controlCurrentWeather(initLoc);
  controlHourlyForecast(initLoc);
  controlDailyForecast(initLoc);
};

const getLocation = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      controlPositionWeather,
      controlPlaceholderWeather
    );
  } else {
    console.log('Geolocation is not supported by this browser.');
  }
};

const controlPositionWeather = async function (position) {
  const { latitude, longitude } = position.coords;

  const location = await model.getPositionName(latitude, longitude);

  controlCurrentWeather(location);
  controlHourlyForecast(location);
  controlDailyForecast(location);
};

const init = function () {
  getLocation();
  controlAddHandlerQuery();
};

init();

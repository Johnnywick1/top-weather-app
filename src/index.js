import { model } from './model';
import { hourView } from './views/hourView';
import { currWeatherView } from './views/currWeatherView';

//  TESTING

const location = 'Manila';

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

    console.log('index currentweather', currentWeather);

    //  4 Display the results
    currWeatherView.renderCurrentWeather(
      currentWeather,
      locationName,
      timezoneOffset
    );
  } catch (err) {
    console.error('controlcurrentweather', err);
  }
};

const controlHourlyForecast = async function (location) {
  try {
    const locationWeather = await model.getWeather(location);

    const hourlyWeather = locationWeather.hourly.slice(1, 25);

    const timezoneOffset = locationWeather.timezone_offset;

    console.log('index hourlyweather', hourlyWeather);

    hourView.renderHourlyForecast(hourlyWeather, timezoneOffset);
  } catch (err) {
    console.error('controlhourlyforecast', err.message);
  }
};

const controlPlaceholderWeather = function () {};

const init = function () {
  controlPlaceholderWeather();
  controlCurrentWeather(location);
  controlHourlyForecast(location);
};

init();

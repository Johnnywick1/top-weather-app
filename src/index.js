import { model } from './model';
import { hourView } from './views/hourView';
import { currWeatherView } from './views/currWeatherView';

//  TESTING

// const sampleData = getHourlyWeather(manilaLoc);
// hourView.displayHourlyWeather(sampleData);

const controlWeatherData = async function (location) {
  try {
  } catch (err) {
    console.error('controlweatherdata', err);
  }
};

const controlCurrentWeather = async function (location) {
  try {
    console.log(location);

    // 1 Get the city and country name
    const [city, country] = await model.getCityAndCountry(location);

    // 2 Get the aggregate weather data for the location
    const locationWeather = await model.getWeather(location);

    // 3 Get the current weather data only
    const currentWeather = await model.getCurrentWeather(locationWeather);

    console.log('index currentweather', currentWeather);

    //  4 Display the results
    currWeatherView.renderCurrentWeather(currentWeather);
    currWeatherView.renderLocation(city, country);
  } catch (err) {
    console.error('controlcurrentweather', err);
  }
};

const controlPlaceholderWeather = function () {};

const init = function () {
  controlPlaceholderWeather();
  controlCurrentWeather('Manila');
};

init();

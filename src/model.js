import { API_KEY, API_URL } from './config';

export const model = (function () {
  let weatherData;

  const getCityURL = function (city) {
    return `${API_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`;
  };

  // Fetches the location data for the queried city
  const getCityData = async function (city) {
    try {
      const response = await fetch(getCityURL(city));
      const data = await response.json();

      return data;
    } catch (err) {
      console.error('getcitydata', err.message);
    }
  };

  // Fetches the city and country name
  const getCityAndCountry = async function (city) {
    try {
      const data = await getCityData(city);
      return [data.name, data.sys.country];
    } catch (err) {
      console.error('getcityandcountry', err.message);
    }
  };

  // Fetches the coordinates to be used for the weather URL
  const getCoords = function (data) {
    const city = data;
    const lat = +city.coord.lat.toFixed(2);
    const long = +city.coord.lon.toFixed(2);

    return [lat, long];
  };

  // Returns the URL for another fetch call
  const getWeatherURL = function (data) {
    const coords = data;

    const [lat, long] = coords;

    return `${API_URL}/onecall?lat=${lat}&lon=${long}&units=metric&exclude=minutely&appid=${API_KEY}`;
  };

  // Fetches the aggregate weather data
  const getWeather = async function (city) {
    try {
      const data = await getCityData(city);
      const coords = getCoords(data);
      const url = getWeatherURL(coords);

      const response = await fetch(url);
      const weather = await response.json();

      console.log(weather);

      return weather;
    } catch (err) {
      console.error('getweather', err.message);
    }
  };

  //  Gets the current weather data from the aggregate
  const getCurrentWeather = function (locationObj) {
    // const locationObj = await getWeather(city);

    const location = locationObj;

    const currentWeather = location.current;
    const timezoneOffset = location.timezone_offset;

    return currentWeather;
  };

  //  Gets the hourly forecast from the aggregate
  const getHourlyWeather = function (locationObj) {
    const location = locationObj;
    const weather48Hrs = location.hourly;
    const weather24Hrs = weather48Hrs.slice(0, 24);

    return weather24Hrs;
  };

  const getTimezoneOffset = async function () {};

  return {
    getWeather,
    getHourlyWeather,
    getCurrentWeather,
    getCityAndCountry,
  };
})();

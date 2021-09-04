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
  const getCoords = async function (data) {
    try {
      const city = await data;
      const lat = +city.coord.lat.toFixed(2);
      const long = +city.coord.lon.toFixed(2);

      return [lat, long];
    } catch (err) {
      console.error('coords', err.message);
    }
  };

  // Returns the URL for another fetch call
  const getWeatherURL = async function (data) {
    try {
      const coords = await data;

      const [lat, long] = coords;

      return `${API_URL}/onecall?lat=${lat}&lon=${long}&units=metric&exclude=minutely&appid=${API_KEY}`;
    } catch (err) {
      console.error('weatherurl', err.message);
    }
  };

  // Fetches the aggregate weather data
  const getWeather = async function (city) {
    try {
      const data = await getCityData(city);
      const coords = await getCoords(data);
      const url = await getWeatherURL(coords);

      const response = await fetch(url);
      const weather = await response.json();

      console.log(weather);

      return weather;
    } catch (err) {
      console.error('getweather', err.message);
    }
  };

  //  Gets the current weather data from the aggregate
  const getCurrentWeather = async function (locationObj) {
    try {
      // const locationObj = await getWeather(city);

      const location = await locationObj;
      const currentWeather = location.current;

      return currentWeather;
    } catch (err) {
      console.error('getcurrentweather', err);
    }
  };

  //  Gets the hourly forecast from the aggregate
  const getHourlyWeather = async function (city) {
    try {
      const locationObj = await getWeather(city);

      const location = await locationObj;
      const weather48Hrs = location.hourly;
      const weather24Hrs = weather48Hrs.slice(0, 24);

      return weather24Hrs;
    } catch (err) {
      console.error('gethourlyweather', err.message);
    }
  };

  return {
    getWeather,
    getHourlyWeather,
    getCurrentWeather,
    getCityAndCountry,
  };
})();

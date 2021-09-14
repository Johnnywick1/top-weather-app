import {
  WEATHER_API_KEY,
  WEATHER_API_URL,
  LOC_API_KEY,
  LOC_API_URL,
} from './config';

export const model = (function () {
  let weatherData;

  const getCityURL = function (city) {
    return `${WEATHER_API_URL}/weather?q=${city}&units=metric&appid=${WEATHER_API_KEY}`;
  };

  // Fetches the location data for the queried city
  const getCityData = async function (city) {
    try {
      const response = await fetch(getCityURL(city));
      const data = await response.json();

      return data;
    } catch (err) {
      throw new Error('Cannot retrieve location data');
    }
  };

  // Fetches the city and country name
  const getCityAndCountry = async function (city) {
    try {
      const data = await getCityData(city);
      return [data.name, data.sys.country];
    } catch (err) {
      throw new Error('Cannot retrieve location data');
    }
  };

  // Fetches the coordinates to be used for the weather URL
  const getCoords = function (city) {
    const lat = +city.coord.lat.toFixed(2);
    const long = +city.coord.lon.toFixed(2);

    return [lat, long];
  };

  // Returns the URL for another fetch call
  const getWeatherURL = function (coords) {
    const [lat, long] = coords;

    return `${WEATHER_API_URL}/onecall?lat=${lat}&lon=${long}&units=metric&exclude=minutely&appid=${WEATHER_API_KEY}`;
  };

  // Fetches the aggregate weather data
  const getWeather = async function (city) {
    try {
      const data = await getCityData(city);

      const coords = getCoords(data);
      const url = getWeatherURL(coords);

      const response = await fetch(url);
      const weather = await response.json();

      return weather;
    } catch (err) {
      throw new Error('Cannot retrieve weather data');
    }
  };

  const getLocationURL = function (coords) {
    const [lat, long] = coords;

    return `${LOC_API_URL}?key=${LOC_API_KEY}&lat=${lat}&lon=${long}&format=json`;
  };

  const getPositionName = async function (latitude, longitude) {
    try {
      const url = getLocationURL([latitude, longitude]);

      const response = await fetch(url);
      const location = await response.json();

      const locationName = location.address.city || location.address.town;

      return locationName;
    } catch (err) {
      throw new Error('Cannot retrieve location data');
    }
  };

  return {
    getWeather,
    getCityAndCountry,
    getPositionName,
  };
})();

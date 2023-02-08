/* eslint-disable consistent-return */
import { API_KEY, WEATHER_API_URL, GEO_API_URL } from './config';
import format from 'date-fns/format';

const model = (() => {
  const getUserLocation = () =>
    // Promisify geolocation API
    new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

  const getUserCoords = async () => {
    try {
      const geoLoc = await getUserLocation();
      const { latitude, longitude } = geoLoc.coords;

      if (!geoLoc) throw new Error('Problem getting user location');

      return [latitude, longitude];
    } catch (err) {
      console.error(`ERROR: ${err}`);
    }
  };

  const getLocationName = async (lat, lng) => {
    try {
      // inaccurate
      const response = await fetch(
        `${GEO_API_URL}/reverse?lat=${lat}&lon=${lng}&appid=${API_KEY}`,
        { mode: 'cors' },
      );
      if (!response.ok) throw new Error('Problem getting location data');

      const data = await response.json();
      console.log(data);

      return data[0].name;
    } catch (err) {
      console.error(`ERROR: ${err}`);
    }
  };

  const getWeatherData = async (lat, lng) => {
    try {
      const response = await fetch(
        `${WEATHER_API_URL}weather?lat=${lat}&lon=${lng}&units=metric&appid=${API_KEY}`,
        { mode: 'cors' },
      );
      if (!response.ok)
        throw new Error('Problem retrieving current weather data');

      const data = await response.json();
      const now = +new Date();

      console.log('data:', data);

      return {
        id: data.weather[0].id,
        cloud_cover: data.clouds.all,
        temp: data.main.temp,
        temp_max: data.main.temp_max,
        temp_min: data.main.temp_min,
        heat_index: data.main.feels_like,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        description: data.weather[0].description,
        weather_id: data.weather[0].id,
        wind_direction: data.wind.deg,
        wind_speed: data.wind.speed,
        rain: data.rain ? data.rain['1h'] : null,
        timeOfDay:
          now < +data.sys.sunrise * 1000 || now > +data.sys.sunset * 1000
            ? 'night'
            : 'day',
        sunrise: format(new Date(data.sys.sunrise * 1000), 'HH:mm'),
        sunset: format(new Date(data.sys.sunset * 1000), 'HH:mm'),
        location: data.name,
        visibility: data.visibility,
      };
    } catch (err) {
      console.error(`ERROR: ${err}`);
    }
  };

  const getForecastData = async (lat, lng) => {
    try {
      const response = await fetch(
        `${WEATHER_API_URL}forecast?lat=${lat}&lon=${lng}&units=metric&appid=${API_KEY}`,
        { mode: 'cors' },
      );
      if (!response.ok) throw new Error('Problem getting forecast data');

      const data = await response.json();

      console.log('forecast:', data);

      return {
        rainfall: data.list[0],
      };

      return {};
    } catch (err) {
      console.error(`ERROR: ${err}`);
    }
  };

  // const init = async () => {
  //   // Get weather for user
  //   const [lat, lng] = await getUserCoords();

  //   getWeatherData(lat, lng);
  //   getLocationName(lat, lng);
  // };

  return {
    getUserCoords,
    getLocationName,
    getWeatherData,
    getForecastData,
    // init,
  };
})();

// model.init();

export default model;

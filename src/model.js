import { API_KEY, WEATHER_API_URL, GEO_API_URL } from './config';

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

      console.log(latitude, longitude);

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
        `${WEATHER_API_URL}lat=${lat}&lon=${lng}&appid=${API_KEY}`,
        { mode: 'cors' },
      );
      if (!response.ok) throw new Error('Problem retrieving weather data');

      const data = await response.json();
      console.log(data);

      return {
        temp: data.main.temp,
        temp_max: data.main.temp_max,
        temp_min: data.main.temp_min,
        heat_index: data.main.feels_like,
        pressure: data.main.pressure,
        description: data.weather[0].description,
        weather_id: data.weather[0].id,
        wind_direction: data.wind.deg,
        wind_speed: data.wind.speed,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        location: data.name,
      };
    } catch (err) {
      console.error(`ERROR: ${err}`);
    }
  };

  const init = async () => {
    // Get weather for user
    const [lat, lng] = await getUserCoords();

    getWeatherData(lat, lng);
    getLocationName(lat, lng);
  };

  return {
    getUserCoords,
    getLocationName,
    getWeatherData,
    init,
  };
})();

model.init();

export default model;

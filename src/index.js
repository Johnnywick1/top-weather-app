import { API_KEY, API_URL } from './config';

let query;

const getCityURL = function (city) {
  return `${API_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`;
};

const getCityData = async function (city) {
  try {
    const response = await fetch(getCityURL(city));
    const data = await response.json();

    return data;
  } catch (err) {
    console.error('getdata', err.message);
  }
};

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

const getWeatherURL = async function (data) {
  try {
    const coords = await data;

    const [lat, long] = coords;

    return `${API_URL}/onecall?lat=${lat}&lon=${long}&units=metric&exclude=minutely&appid=${API_KEY}`;
  } catch (err) {
    console.error('weatherurl', err.message);
  }
};

const getWeather = async function (city) {
  try {
    const data = await getCityData(city);
    const coords = await getCoords(data);
    const url = await getWeatherURL(coords);

    const response = await fetch(url);
    const weather = await response.json();

    return weather;
  } catch (err) {
    console.error(err.message);
  }
};

const manilaLoc = getWeather('Manila');

const getHourlyWeather = async function (locationObj) {
  try {
    const location = await locationObj;
    const weather48Hrs = location.hourly;
    const weather24Hrs = weather48Hrs.slice(0, 24);

    return weather24Hrs;
  } catch (err) {
    console.error('gethourlyweather', err.message);
  }
};

getHourlyWeather(manilaLoc);

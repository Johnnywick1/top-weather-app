import { getURL } from './helpers';

const getWeather = async function (city) {
  try {
    const response = await fetch(getURL(city));
    const data = await response.json();
  } catch (err) {
    console.error(err.message);
  }
};

getWeather('New York');

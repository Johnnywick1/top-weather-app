import { model } from './model';
import { hourView } from './views/hourView';
import { currWeatherView } from './views/currWeatherView';

//  TESTING

const controlCurrentWeather = async function () {
  try {
    const city = await model.cityName;
    const country = await model.countryName;

    const manilaLoc = model.getWeather('Manila');
    // const sampleData = getHourlyWeather(manilaLoc);
    // hourView.displayHourlyWeather(sampleData);

    const sampleData2 = model.getCurrentWeather(manilaLoc);
    currWeatherView.displayCurrentWeather(sampleData2);

    currWeatherView.displayLocation(city, country);
  } catch (err) {
    console.error('controlcurrentweather', err);
  }
};

controlCurrentWeather();

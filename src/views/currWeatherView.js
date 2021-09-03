export const currWeatherView = (function () {
  const locationEl = document.querySelector('.cw--location');
  const tempEl = document.querySelector('.cw--temperature');
  const statusEl = document.querySelector('.cw--weather-status');
  const dateEl = document.querySelector('.cw--date');
  const timeEl = document.querySelector('.cw--time');

  const displayCurrentWeather = async function (weather) {
    const currentWeather = await weather;
    console.log(currentWeather);
  };

  const displayLocation = async function (cityName, countryName) {
    const city = await cityName;
    const country = await countryName;

    locationEl.textContent = `${city}, ${country}`;
  };

  return {
    displayCurrentWeather,
    displayLocation,
  };
})();

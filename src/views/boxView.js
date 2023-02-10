import { format } from 'date-fns';
import { getLocalTime } from '../helpers';

import View from './View';

const BoxView = (() => {
  const renderCloudBox = (cloudCover) => {
    const boxEl = document.querySelector('.display-box.weather--cloud-cover');
    const valueEl = document.querySelector('.cloud--value');
    const descEl = document.querySelector('.cloud--desc');

    if (!cloudCover) {
      View.hideEl(boxEl);
      return;
    }

    valueEl.textContent = cloudCover;

    if (+cloudCover < 25) {
      descEl.textContent = 'Seek cover and use significant sun protection';
    } else if (+cloudCover < 50) {
      descEl.textContent = 'Be wary of sun damage! Use sun protection ';
    } else descEl.textContent = 'Use light sun protection';

    View.unhideEl(boxEl);
  };

  const renderSunriseSunset = (sunrise, sunset, timeOfDay, tzOffset) => {
    const sunriseArr = getLocalTime(tzOffset, sunrise * 1000);
    const formatSunrise = format(new Date(...sunriseArr), 'HH:mm');

    const sunsetArr = getLocalTime(tzOffset, sunset * 1000);
    const formatSunset = format(new Date(...sunsetArr), 'HH:mm');

    const boxEl = document.querySelector(
      '.display-box.weather--sunrise-sunset',
    );
    const labelEl = document.querySelector('.sun--label-text');
    const valueEl = document.querySelector('.sun--value');
    const descEl = document.querySelector('.sunrise-sunset--desc');

    if (!sunrise || !sunset) {
      View.hideEl(boxEl);
      return;
    }

    if (timeOfDay === 'night') {
      labelEl.textContent = 'Sunrise';
      valueEl.textContent = formatSunrise;
      descEl.textContent = `Sunset: ${formatSunset}`;
    } else {
      labelEl.textContent = 'Sunset';
      valueEl.textContent = formatSunset;
      descEl.textContent = `Sunrise: ${formatSunrise}`;
    }

    View.unhideEl(boxEl);
  };

  const renderHumidity = (humidity) => {
    const boxEl = document.querySelector('.display-box.weather--humidity');
    const valueEl = document.querySelector('.humidity--value');
    const descEl = document.querySelector('.humidity--desc');

    valueEl.textContent = humidity;

    if (!humidity) {
      View.hideEl(boxEl);
      return;
    }

    if (+humidity < 30) {
      descEl.textContent = `Low humidity, take precautionary measures`;
    } else if (+humidity <= 50) {
      descEl.textContent = `Humidity is at a comfortable level`;
    } else if (+humidity > 50) {
      descEl.textContent = `High humidity, take precautionary measures`;
    }

    View.unhideEl(boxEl);
  };

  const renderPressure = (pressure) => {
    const boxEl = document.querySelector('.display-box.weather--pressure');
    const valueEl = document.querySelector('.pressure--value');
    const descEl = document.querySelector('.pressure--desc');

    if (!pressure) {
      View.hideEl(boxEl);
      return;
    }

    valueEl.textContent = pressure;

    if (+pressure > 1022) {
      descEl.textContent = `Atmospheric pressure is high`;
    } else if (+pressure > 1009 && +pressure <= 1022) {
      descEl.textContent = `Atmospheric pressure is normal`;
    } else descEl.textContent = `Atmospheric pressure is low`;

    View.unhideEl(boxEl);
  };

  const renderWind = (speed, direction) => {
    const boxEl = document.querySelector('.display-box.weather--wind');

    const valueEl = document.querySelector('.wind--value');
    const descEl = document.querySelector('.wind--desc');

    if (!speed) {
      View.hideEl(boxEl);
      return;
    }

    valueEl.textContent = +speed.toFixed(1);
    descEl.innerHTML = `The wind is coming from ${direction}° 
    <i class="wind--icon wi wi-wind towards-${direction}-deg"></i> 
   `;

    View.unhideEl(boxEl);
  };

  const renderRainfall = (rain) => {
    const boxEl = document.querySelector('.display-box.weather--rainfall');
    const valueEl = document.querySelector('.rain--value');
    const descEl = document.querySelector('.rain--desc');

    if (!rain) {
      View.hideEl(boxEl);
      return;
    }

    valueEl.textContent = rain;

    if (+rain < 0.1) {
      descEl.textContent = `No rainfal at this moment`;
    } else if (+rain < 2.5) {
      descEl.textContent = `Light rain, take an umbrella outside.`;
    } else if (+rain >= 2.5 && +rain < 7.6) {
      descEl.textContent = 'Moderate rain, take necessary precaution';
    } else descEl.textContent = 'Heavy rain, take necessary precaution';

    View.unhideEl(boxEl);
  };

  const renderHeatIndex = (heatIndex, temp) => {
    const boxEl = document.querySelector('.display-box.weather--heat-index');
    const valueEl = document.querySelector(
      '.heat-index--value-wrapper .temp-value',
    );
    const descEl = document.querySelector('.heat-index--desc');

    if (!heatIndex) {
      View.hideEl(boxEl);
      return;
    }

    valueEl.textContent = +heatIndex.toFixed(1);

    if (+heatIndex > +temp + 3) {
      descEl.textContent =
        'Humidity is making it feel significantly warmer than usual';
    } else if (+heatIndex > +temp) {
      descEl.textContent =
        'Humidity is making it feel slightly warmer than usual';
    } else if (+heatIndex === +temp) {
      descEl.textContent = 'Similar to the actual temperature';
    } else if (+heatIndex < +temp - 3) {
      descEl.textContent = 'Wind is making it feel significantly colder';
    } else descEl.textContent = 'Wind is making it feel slightly cooler';

    View.unhideEl(boxEl);
  };

  const renderVisibility = (visibility) => {
    const boxEl = document.querySelector('.display-box.weather--visibility');
    const valueEl = document.querySelector('.visibility--value');
    const descEl = document.querySelector('.visibility--desc');

    if (!visibility) {
      View.hideEl(boxEl);
      return;
    }

    valueEl.textContent = (+visibility / 1000).toFixed(1);

    if (+visibility < 100) {
      descEl.textContent =
        'Extremely low visibility. Going outside is not advised';
    } else if (+visibility < 2750) {
      descEl.textContent = 'Low visibility, take caution when driving';
    } else if (+visibility < 8000) {
      descEl.textContent = 'Minor atmospheric particle issues might occur';
    } else descEl.textContent = 'It is clear right now';

    View.unhideEl(boxEl);
  };

  const renderWeatherBoxes = (data) => {
    renderCloudBox(data.cloud_cover);
    renderSunriseSunset(
      data.sunrise,
      data.sunset,
      data.timeOfDay,
      data.timezone,
    );
    renderHumidity(data.humidity);
    renderPressure(data.pressure);
    renderWind(data.wind_speed, data.wind_direction);
    renderVisibility(data.visibility);
    renderHeatIndex(data.heat_index, data.temp);
    renderRainfall(data.rain);
  };

  return {
    renderWeatherBoxes,
  };
})();

export default BoxView;

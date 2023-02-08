const View = (() => {
  const renderWeatherMain = (data) => {
    const containerEl = document.querySelector('.weather--main');
    const footerEl = document.querySelector('.weather--footer');

    const locationEl = document.querySelector('.main--location');
    const iconEl = document.querySelector('.main--icon');
    const tempEl = document.querySelector('.temp-value');
    const descEl = document.querySelector('.main--desc');
    const tempMaxEl = document.querySelector('.temp-extreme--high .temp-value');
    const tempMinEl = document.querySelector('.temp-extreme--low .temp-value');
    const footerLocEl = document.querySelector('.weather-footer--location');

    locationEl.textContent = data.location;
    tempEl.textContent = +data.temp.toFixed(1);
    descEl.textContent = data.description;
    tempMaxEl.textContent = +data.temp_max.toFixed(1);
    tempMinEl.textContent = +data.temp_min.toFixed(1);
    footerLocEl.textContent = data.location;
    iconEl.classList.add(`wi-owm-${data.timeOfDay}-${data.id}`);

    unhideEl(containerEl);
    unhideEl(footerEl);
  };

  const renderWeatherBoxes = (data) => {
    renderCloudBox(data.cloud_cover);
    renderSunriseSunset(data.sunrise, data.sunset, data.timeOfDay);
    renderHumidity(data.humidity);
    renderPressure(data.pressure);
    renderWind(data.wind_speed, data.wind_direction);
    renderVisibility(data.visibility);
    renderHeatIndex(data.heat_index);
    renderRainfall(data.rain);
  };

  const renderCloudBox = (cloudCover) => {
    if (!cloudCover) return;

    const boxEl = document.querySelector('.display-box.weather--cloud-cover');
    const valueEl = document.querySelector('.cloud--value');
    const descEl = document.querySelector('.cloud--desc');

    valueEl.textContent = cloudCover;

    if (+cloudCover < 25) {
      descEl.textContent = 'Seek cover and use significant sun protection';
    } else if (+cloudCover < 50) {
      descEl.textContent = 'Be wary of sun damage! Use sun protection ';
    } else descEl.textContent = 'Use light sun protection';

    unhideEl(boxEl);
  };

  const renderSunriseSunset = (sunrise, sunset, timeOfDay) => {
    if (!sunrise || !sunset) return;

    const boxEl = document.querySelector(
      '.display-box.weather--sunrise-sunset',
    );
    const labelEl = document.querySelector('.sun--label');
    const valueEl = document.querySelector('.sun--value');
    const descEl = document.querySelector('.sunrise-sunset--desc');

    const now = +new Date();

    if (timeOfDay === 'night') {
      labelEl.textContent = 'Sunrise';
      valueEl.textContent = sunrise;
      descEl.textContent = `Sunset: ${sunset}`;
    } else {
      labelEl.textContent = 'Sunset';
      valueEl.textContent = sunset;
      descEl.textContent = `Sunrise: ${sunrise}`;
    }

    unhideEl(boxEl);
  };

  const renderHumidity = (humidity) => {
    if (!humidity) return;

    const boxEl = document.querySelector('.display-box.weather--humidity');
    const valueEl = document.querySelector('.humidity--value');
    const descEl = document.querySelector('.humidity--desc');

    valueEl.textContent = humidity;

    if (+humidity < 30) {
      descEl.textContent = `Low humidity, take precautionary measures`;
    } else if (+humidity <= 50) {
      descEl.textContent = `Humidity is at a comfortable level`;
    } else if (+humidity > 50) {
      descEl.textContent = `High humidity, take precautionary measures`;
    }

    unhideEl(boxEl);
  };

  const renderPressure = (pressure) => {
    if (!pressure) return;

    const boxEl = document.querySelector('.display-box.weather--pressure');
    const valueEl = document.querySelector('.pressure--value');
    const descEl = document.querySelector('.pressure--desc');

    valueEl.textContent = pressure;

    if (+pressure > 1022) {
      descEl.textContent = `Atmospheric pressure is high`;
    } else if (+pressure > 1009 && +pressure <= 1022) {
      descEl.textContent = `Atmospheric pressure is normal`;
    } else descEl.textContent = `Atmospheric pressure is low`;

    unhideEl(boxEl);
  };

  const renderWind = (speed, direction) => {
    if (!speed) return;

    const boxEl = document.querySelector('.display-box.weather--wind');

    const valueEl = document.querySelector('.wind--value');
    const descEl = document.querySelector('.wind--desc');

    valueEl.textContent = +speed.toFixed(1);
    descEl.innerHTML = `The wind is coming from ${direction}° 
    <i class="wind--icon wi wi-wind towards-${direction}-deg"></i> 
   `;

    unhideEl(boxEl);
  };

  const renderRainfall = (rain) => {
    if (!rain) return;

    const boxEl = document.querySelector('.display-box.weather--rainfall');
    const valueEl = document.querySelector('.rain--value');
    const descEl = document.querySelector('.rain--desc');

    valueEl.textContent = rain;

    if (+rain < 0.1) {
      descEl.textContent = `No rainfal at this moment`;
    } else if (+rain < 2.5) {
      descEl.textContent = `Light rain, take an umbrella outside.`;
    } else if (+rain >= 2.5 && +rain < 7.6) {
      descEl.textContent = 'Moderate rain, take necessary precaution';
    } else descEl.textContent = 'Heavy rain, take necessary precaution';

    unhideEl(boxEl);
  };

  const renderHeatIndex = (heatIndex, temp) => {
    if (!heatIndex) return;

    const boxEl = document.querySelector('.display-box.weather--heat-index');
    const valueEl = document.querySelector(
      '.heat-index--value-wrapper .temp-value',
    );
    const descEl = document.querySelector('.heat-index--desc');

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

    unhideEl(boxEl);
  };

  const renderVisibility = (visibility) => {
    if (!visibility) return;

    const boxEl = document.querySelector('.display-box.weather--visibility');
    const valueEl = document.querySelector('.visibility--value');
    const descEl = document.querySelector('.visibility--desc');

    valueEl.textContent = (+visibility / 1000).toFixed(1);

    if (+visibility < 100) {
      descEl.textContent =
        'Extremely low visibility. Going outside is not advised';
    } else if (+visibility < 2000) {
      descEl.textContent = 'Low visibility, take caution when driving';
    } else if (+visibility < 5000) {
      descEl.textContent = 'Minor atmospheric particle issues might occur';
    } else descEl.textContent = 'It is clear right now';

    unhideEl(boxEl);
  };

  const unhideEl = (el) => {
    el.classList.remove('hidden');
  };

  const hideEl = (el) => {
    el.classList.add('hidden');
  };

  return {
    renderWeatherMain,
    renderWeatherBoxes,
  };
})();

export default View;

import {
  convertToCelsius,
  convertToFahr,
  convertToHPa,
  convertToKm,
  convertToMiles,
  convertToPSI,
} from '../helpers';

const View = (() => {
  const unhideEl = (el) => {
    el.classList.remove('hidden');
  };

  const hideEl = (el) => {
    el.classList.add('hidden');
  };

  const clearEl = (el) => {
    el.innerHTML = ``;
  };

  const convertUnits = (e) => {
    if (
      e.target.closest('.btn-convert').classList.contains('btn-convert--active')
    )
      return;

    const btns = document.querySelectorAll('.btn-convert');

    const tempValues = document.querySelectorAll('.temp-value');
    const mainTempValue = document.querySelector('.main--temp-value');

    const pressureVal = document.querySelector('.pressure--value');
    const pressureUnit = document.querySelector('.pressure--unit');

    const visibilityVal = document.querySelector('.visibility--value');
    const visibilityUnit = document.querySelector('.visibility--unit');

    const windVal = document.querySelector('.wind--value');
    const windUnit = document.querySelector('.wind--unit');

    const convertTo = e.target.closest('.btn-convert').dataset.units;

    btns.forEach((btn) => btn.classList.remove('btn-convert--active'));
    e.target.closest('.btn-convert').classList.add('btn-convert--active');

    if (convertTo === 'imperial') {
      tempValues.forEach((temp) => {
        const origTemp = temp.textContent;

        temp.textContent = convertToFahr(origTemp).toFixed(1);
      });

      const origMainTemp = mainTempValue.textContent;
      mainTempValue.textContent = Math.round(convertToFahr(origMainTemp));

      const origPressure = pressureVal.textContent;
      pressureVal.textContent = convertToPSI(origPressure).toFixed(0);
      pressureUnit.textContent = 'psi';

      const origWind = windVal.textContent;
      windVal.textContent = convertToMiles(origWind).toFixed(1);
      windUnit.textContent = 'mi/h';

      const origVis = visibilityVal.textContent;
      visibilityVal.textContent = convertToMiles(origVis).toFixed(0);
      visibilityUnit.textContent = 'mi';
    } else if (convertTo === 'metric') {
      tempValues.forEach((temp) => {
        const origTemp = temp.textContent;

        temp.textContent = convertToCelsius(origTemp).toFixed(1);
      });

      const origMainTemp = mainTempValue.textContent;
      mainTempValue.textContent = Math.round(convertToCelsius(origMainTemp));

      const origPressure = pressureVal.textContent;
      pressureVal.textContent = convertToHPa(origPressure).toFixed(0);
      pressureUnit.textContent = 'hPa';

      const origWind = windVal.textContent;
      windVal.textContent = convertToKm(origWind).toFixed(1);
      windUnit.textContent = 'kph';

      const origVis = visibilityVal.textContent;
      visibilityVal.textContent = convertToKm(origVis).toFixed(0);
      visibilityUnit.textContent = 'km';
    }
  };

  const addHandlerToggleTempUnits = () => {
    const btnMetric = document.querySelector('.btn-convert.btn-metric');
    const btnImperial = document.querySelector('.btn-convert.btn-imperial');

    btnMetric.addEventListener('click', convertUnits.bind(this));
    btnImperial.addEventListener('click', convertUnits.bind(this));
  };

  const resetDisplay = () => {
    document.querySelector('.pressure--unit').textContent = 'hPa';

    document.querySelector('.visibility--unit').textContent = 'km';

    document.querySelector('.wind--unit').textContent = 'kph';

    document
      .querySelectorAll('.btn-convert')
      .forEach((btn) => btn.classList.remove('btn-convert--active'));

    document.querySelector('.btn-metric').classList.add('btn-convert--active');
  };

  const renderSpinner = () => {
    hideEl(document.querySelector('footer'));
    unhideEl(document.querySelector('.spinner'));
    unhideEl(document.querySelector('.overlay'));
  };

  const hideSpinner = () => {
    unhideEl(document.querySelector('footer'));
    hideEl(document.querySelector('.spinner'));
    hideEl(document.querySelector('.overlay'));
  };

  const renderError = (err) => {
    const container = document.querySelector('.container');

    container.innerHTML = `<span class="error-message">${err}</span>`;

    hideEl(document.querySelector('footer'));
  };

  const changeToDarkText = (...elements) => {
    elements.forEach((el) => (el.style.color = 'rgb(0,0,0)'));
  };

  const changeToLightText = (...elements) => {
    elements.forEach((el) => (el.style.color = 'rgb(255,255,255)'));
  };

  const renderBackground = (data) => {
    function importAll(r) {
      const images = {};
      r.keys().forEach((item) => {
        images[item.replace('./', '')] = r(item);
      });
      return images;
    }
    const bgImages = importAll(
      require.context('../img/weather-bg', true, /\.(png|jpe?g|svg)$/),
    );

    const bodyEl = document.querySelector('body');
    const mainEl = document.querySelector('.weather--main');
    const timestampEl = document.querySelector('.main--timestamp');
    const btnContainer = document.querySelector('.btn-convert--wrapper');
    const weatherFooterEl = document.querySelector('.weather--footer');
    const footerEl = document.querySelector('footer');
    const creditEl = document.querySelector('.bg-credit');

    const textElements = [
      mainEl,
      timestampEl,
      btnContainer,
      weatherFooterEl,
      footerEl,
      creditEl,
    ];

    const id = data.id.toString();

    let imgUrl;
    let author;
    let authorUrl;

    if (id[0] === '2') {
      // Weather: Thunderstorm
      imgUrl = bgImages['thunderstorm.jpg'];
      changeToLightText(...textElements);

      author = 'Ben Owen';
      authorUrl = 'https://unsplash.com/@circleb';
    } else if (id[0] === '3' || id === '500') {
      // Weather: Light Rain
      imgUrl = bgImages['light-rain.jpg'];
      changeToDarkText(mainEl, timestampEl, btnContainer);
      changeToLightText(weatherFooterEl, footerEl, creditEl);

      author = 'Anant Chandra';
      authorUrl = 'https://unsplash.com/@anant347';
    } else if (id[0] === '5') {
      // Weather: Heavy Rain
      imgUrl = bgImages['heavy-rain.jpg'];
      changeToDarkText(mainEl, timestampEl, btnContainer);
      changeToLightText(weatherFooterEl, footerEl, creditEl);

      author = 'Anne Nygard';
      authorUrl = 'https://unsplash.com/@polarmermaid';
    } else if (id === '701' || id === '711' || id === '721' || id === '731') {
      // Weather: Haze
      imgUrl = bgImages['haze.jpg'];
      changeToDarkText(...textElements);

      author = 'Alex Gindin';
      authorUrl = 'https://unsplash.com/@alexgindin';
    } else if (id[0] === '6') {
      // Weather: Snow
      imgUrl = bgImages['snow.jpg'];
      changeToDarkText(...textElements);

      author = 'Adam Chang';
      authorUrl = 'https://unsplash.com/@sametomorrow';
    } else if (id === '741') {
      // Weather: Fog
      imgUrl = bgImages['fog.jpg'];
      changeToDarkText(...textElements);

      author = 'Artem Sapegin';
      authorUrl = 'https://unsplash.com/@sapegin';
    } else if (id === '751' || id === '752' || id === '761' || id === '762') {
      // Weather: Sandstorm
      imgUrl = bgImages['sandstorm.jpg'];
      changeToLightText(...textElements);

      author = 'Andreas Brun';
      authorUrl = 'https://unsplash.com/@andreasbrun';
    } else if (id === '771' || id === '781') {
      // Weather: Tornado
      imgUrl = bgImages['tornado.jpg'];
      changeToLightText(...textElements);

      author = 'Andrew Seaman';
      authorUrl = 'https://unsplash.com/@amseaman';
    } else if (id === '800' && data.timeOfDay === 'day') {
      // Weather: Clear Sky in the day
      imgUrl = bgImages['clear-sky.jpg'];
      changeToDarkText(...textElements);

      author = 'Elia Clerici';
      authorUrl = 'https://unsplash.com/@ielix';
    } else if (id === '800' && data.timeOfDay === 'night') {
      // Weather: Clear Sky at night
      imgUrl = bgImages['clear-night-sky.jpg'];
      changeToLightText(...textElements);

      author = 'Olena Sergienko';
      authorUrl = 'https://unsplash.com/@olenkasergienko';
    } else if ((id === '803' || id === '804') && data.timeOfDay === 'night') {
      // Weather: Overcast Sky at night
      imgUrl = bgImages['overcast-night.jpg'];
      changeToLightText(...textElements);

      author = 'Antoine Barres';
      authorUrl = 'https://unsplash.com/@antoinebarres';
    } else if ((id === '801' || id === '802') && data.timeOfDay === 'night') {
      // Weather: Scattered Clouds at night
      imgUrl = bgImages['scattered-clouds-night.jpg'];
      changeToLightText(...textElements);

      author = 'Magnus Ostberg';
      authorUrl = 'https://unsplash.com/@magnusostberg';
    } else if ((id === '801' || id === '802') && data.timeOfDay === 'day') {
      // Weather: Scattered Clouds
      imgUrl = bgImages['scattered-clouds.jpg'];
      changeToDarkText(...textElements);

      author = 'Priya Bhagtani';
      authorUrl = 'https://unsplash.com/@priya1007';
    } else if (id === '804' && data.timeOfDay === 'day') {
      // Weather: Fully Overcast Sky
      imgUrl = bgImages['full-overcast.jpg'];
      changeToDarkText(...textElements);

      author = 'Peyman Farmani';
      authorUrl = 'https://unsplash.com/@peymanfarmani';
    } else {
      // Weather: Overcast Sky
      imgUrl = bgImages['overcast-day.jpg'];
      changeToDarkText(...textElements);

      author = 'elCarito';
      authorUrl = 'https://unsplash.com/@elcarito ';
    }

    bodyEl.style.backgroundImage = `url(${imgUrl})`;
    creditEl.textContent = `Background image by ${author} on Unsplash`;
    creditEl.setAttribute('href', authorUrl);
  };

  return {
    unhideEl,
    hideEl,
    clearEl,
    addHandlerToggleTempUnits,
    resetDisplay,
    renderSpinner,
    hideSpinner,
    renderError,
    renderBackground,
  };
})();

export default View;

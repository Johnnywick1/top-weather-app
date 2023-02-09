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

  const addHandlerToggleTempUnits = () => {
    const btnMetric = document.querySelector('.btn-convert.btn-metric');
    const btnImperial = document.querySelector('.btn-convert.btn-imperial');

    btnMetric.addEventListener('click', convertUnits.bind(this));
    btnImperial.addEventListener('click', convertUnits.bind(this));
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
      pressureVal.textContent = convertToPSI(origPressure).toFixed(1);
      pressureUnit.textContent = 'psi';

      const origWind = windVal.textContent;
      windVal.textContent = convertToMiles(origWind).toFixed(1);
      windUnit.textContent = 'mi/h';

      const origVis = visibilityVal.textContent;
      visibilityVal.textContent = convertToMiles(origVis).toFixed(1);
      visibilityUnit.textContent = 'mi';
    } else if (convertTo === 'metric') {
      tempValues.forEach((temp) => {
        const origTemp = temp.textContent;

        temp.textContent = convertToCelsius(origTemp).toFixed(1);
      });

      const origMainTemp = mainTempValue.textContent;
      mainTempValue.textContent = Math.round(convertToCelsius(origMainTemp));

      const origPressure = pressureVal.textContent;
      pressureVal.textContent = convertToHPa(origPressure).toFixed(1);
      pressureUnit.textContent = 'hPa';

      const origWind = windVal.textContent;
      windVal.textContent = convertToKm(origWind).toFixed(1);
      windUnit.textContent = 'kph';

      const origVis = visibilityVal.textContent;
      visibilityVal.textContent = convertToKm(origVis).toFixed(1);
      visibilityUnit.textContent = 'km';
    }
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

  return {
    unhideEl,
    hideEl,
    clearEl,
    addHandlerToggleTempUnits,
    resetDisplay,
    renderSpinner,
    hideSpinner,
    renderError,
  };
})();

export default View;

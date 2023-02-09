import { getLocalTime } from '../helpers';
import format from 'date-fns/format';
import View from './View';

const MainView = (() => {
  const renderWeatherMain = (data) => {
    const containerEl = document.querySelector('.weather--main');
    const footerEl = document.querySelector('.weather--footer');

    const locationEl = document.querySelector('.main--location');
    const tsLocationEl = document.querySelector('.timestamp--location');
    const tsTimeEl = document.querySelector('.timestamp--time');
    const iconEl = document.querySelector('.main--icon');
    const tempEl = document.querySelector('.main--temp-value');
    const descEl = document.querySelector('.main--desc');
    const tempMaxEl = document.querySelector('.temp-extreme--high .temp-value');
    const tempMinEl = document.querySelector('.temp-extreme--low .temp-value');
    const footerLocEl = document.querySelector('.weather-footer--location');

    locationEl.textContent = `${data.location}, ${data.country}`;
    tempEl.textContent = Math.round(+data.temp);
    descEl.textContent = data.description;
    tempMaxEl.textContent = +data.temp_max.toFixed(1);
    tempMinEl.textContent = +data.temp_min.toFixed(1);

    iconEl.removeAttribute('class');
    iconEl.classList.add(
      'main--icon',
      'wi',
      `wi-owm-${data.timeOfDay}-${data.id}`,
    );
    footerLocEl.textContent = data.location;

    tsLocationEl.textContent = data.location;
    tsTimeEl.textContent = format(
      new Date(...getLocalTime(data.timezone)),
      'HH:mm',
    );

    View.unhideEl(containerEl);
    View.unhideEl(footerEl);
  };

  return {
    renderWeatherMain,
  };
})();

export default MainView;

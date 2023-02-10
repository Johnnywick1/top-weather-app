import { format } from 'date-fns';
import { getLocalTime } from '../helpers';

import View from './View';

const ForecastView = (() => {
  const generateSliderMarkup = (self, minTemp, range) => {
    const markup = `
            <div class="temp-slider--bg">
                <div class="temp-slider--value" style="
                    left:${Math.round(
                      ((+self.min_temp - minTemp) / range) * 100,
                    )}%; width:${Math.round(
      ((+self.max_temp - +self.min_temp) / range) * 100,
    )}%;
                "></div>
            </div>`;

    return markup;
  };

  const generateDailyMarkup = (data) => {
    const weeklyMin = data.reduce(
      (prev, curr) => (prev.min_temp < curr.min_temp ? prev : curr),
      0,
    );

    const weeklyMax = data.reduce(
      (prev, curr) => (prev.max_temp > curr.max_temp ? prev : curr),
      0,
    );

    const minTemp = +weeklyMin.min_temp;
    const maxTemp = +weeklyMax.max_temp;

    const range = Math.round(maxTemp - minTemp);

    return data
      .map(
        (day) => `
        <div class="daily--card">
            <div class="daily--day">${day.day}</div>
            <div class="daily--icon">
              <i class="daily--icon wi wi-owm-${day.id}"></i>
            </div>
            <div class="daily--temp">
              <div class="daily--temp-min">
                <span class="temp-value">${+day.min_temp.toFixed(1)}</span
                ><span class="db-unit unit-degree">°</span>
              </div>
              <div class="daily--temp-slider-wrapper">
                    ${generateSliderMarkup(day, minTemp, range)}
              </div>
              <div class="daily--temp-max">
                <span class="temp-value">${+day.max_temp.toFixed(1)}</span
                ><span class="db-unit unit-degree">°</span>
              </div>
            </div>
        </div>
    `,
      )
      .join('');
  };

  const renderDaily = (data) => {
    const container = document.querySelector('.weather--daily-forecast');
    const wrapper = document.querySelector('.daily--cards-wrapper');

    View.clearEl(wrapper);

    const markup = generateDailyMarkup(data);

    wrapper.insertAdjacentHTML(`afterbegin`, markup);
    View.unhideEl(container);
  };

  const renderHourly = (data) => {
    const container = document.querySelector('.weather--hourly-forecast');
    const wrapper = document.querySelector('.hourly--cards-wrapper');

    View.clearEl(wrapper);

    const markup = data
      .map(
        (hour) => `
        <div class="hourly--card">
            <div class="hourly--hour">
            ${format(
              new Date(...getLocalTime(+hour.timezone, +hour.time * 1000)),
              'HH',
            )}
          </div>
            <div class="hourly--icon">
                <i class="hourly--icon wi wi-owm-${hour.timeOfDay}-${
          hour.id
        }"></i>
            </div>
            <div class="hourly--temp">
              <span class="temp-value">${+hour.temp.toFixed(1)}</span
              ><span class="db-unit unit-degree">°</span>
            </div>
        </div>`,
      )
      .join('');

    wrapper.insertAdjacentHTML(`afterbegin`, markup);
    View.unhideEl(container);
  };

  return {
    renderHourly,
    renderDaily,
  };
})();

export default ForecastView;

import { vi } from 'date-fns/locale';
import View from './View';

const ForecastView = (() => {
  const renderHourly = (data) => {
    const container = document.querySelector('.weather--hourly-forecast');
    const wrapper = document.querySelector('.hourly--cards-wrapper');

    View.clearEl(wrapper);

    const markup = data
      .map(
        (hour) => `
        <div class="hourly--card">
            <div class="hourly--hour">${hour.time}</div>
            <div class="hourly--icon">
                <i class="hourly--icon wi wi-owm-${hour.id}"></i>
            </div>
            <div class="hourly--temp">
              <span class="temp-value temp-value--celsius">${+hour.temp.toFixed(
                1,
              )}</span
              ><span class="db-unit unit-degree">°</span>
            </div>
        </div>`,
      )
      .join('');

    wrapper.insertAdjacentHTML(`afterbegin`, markup);
    View.unhideEl(container);
  };

  const renderDaily = (data) => {
    const container = document.querySelector('.weather--daily-forecast');
    const wrapper = document.querySelector('.daily--cards-wrapper');

    View.clearEl(wrapper);
    console.log(data);

    const markup = generateMarkup(data);

    wrapper.insertAdjacentHTML(`afterbegin`, markup);
    View.unhideEl(container);
  };

  const generateMarkup = (data) => {
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
                <span class="temp-value temp-value--celsius">${Math.round(
                  +day.min_temp,
                )}</span
                ><span class="db-unit unit-degree">°</span>
              </div>
              <div class="daily--temp-slider-wrapper">
                    ${generateSliderMarkup(day, minTemp, range)}
              </div>
              <div class="daily--temp-max">
                <span class="temp-value temp-value--celsius">${Math.round(
                  +day.max_temp,
                )}</span
                ><span class="db-unit unit-degree">°</span>
              </div>
            </div>
        </div>
    `,
      )
      .join('');
  };

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

  return {
    renderHourly,
    renderDaily,
  };
})();

export default ForecastView;

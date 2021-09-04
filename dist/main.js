/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "API_KEY": () => (/* binding */ API_KEY),
/* harmony export */   "API_URL": () => (/* binding */ API_URL)
/* harmony export */ });
const API_KEY = `9f5a0a9571f86000054119d65c0d4f86`;

const API_URL = `https://api.openweathermap.org/data/2.5`;


/***/ }),

/***/ "./src/helpers.js":
/*!************************!*\
  !*** ./src/helpers.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "padStartHour": () => (/* binding */ padStartHour),
/* harmony export */   "getCorrectHour": () => (/* binding */ getCorrectHour),
/* harmony export */   "capitalize": () => (/* binding */ capitalize)
/* harmony export */ });
const padStartHour = function (hour) {
  const toPad = hour + '';
  return toPad.padStart(2, '0');
};

const getCorrectHour = function (hour) {
  const toPad = +hour < 24 ? hour : +hour - 24;

  const hourPadded = padStartHour(toPad);

  return hourPadded;
};

const capitalize = function (str) {
  const strArr = str.split(' ');

  const capitalizeArr = strArr.map((word) =>
    word.replace(word[0], word[0].toUpperCase())
  );

  return capitalizeArr.join(' ');
};


/***/ }),

/***/ "./src/model.js":
/*!**********************!*\
  !*** ./src/model.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "model": () => (/* binding */ model)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "./src/config.js");


const model = (function () {
  let weatherData;

  const getCityURL = function (city) {
    return `${_config__WEBPACK_IMPORTED_MODULE_0__.API_URL}/weather?q=${city}&units=metric&appid=${_config__WEBPACK_IMPORTED_MODULE_0__.API_KEY}`;
  };

  // Fetches the location data for the queried city
  const getCityData = async function (city) {
    try {
      const response = await fetch(getCityURL(city));
      const data = await response.json();

      return data;
    } catch (err) {
      console.error('getcitydata', err.message);
    }
  };

  // Fetches the city and country name
  const getCityAndCountry = async function (city) {
    try {
      const data = await getCityData(city);
      return [data.name, data.sys.country];
    } catch (err) {
      console.error('getcityandcountry', err.message);
    }
  };

  // Fetches the coordinates to be used for the weather URL
  const getCoords = async function (data) {
    try {
      const city = await data;
      const lat = +city.coord.lat.toFixed(2);
      const long = +city.coord.lon.toFixed(2);

      return [lat, long];
    } catch (err) {
      console.error('coords', err.message);
    }
  };

  // Returns the URL for another fetch call
  const getWeatherURL = async function (data) {
    try {
      const coords = await data;

      const [lat, long] = coords;

      return `${_config__WEBPACK_IMPORTED_MODULE_0__.API_URL}/onecall?lat=${lat}&lon=${long}&units=metric&exclude=minutely&appid=${_config__WEBPACK_IMPORTED_MODULE_0__.API_KEY}`;
    } catch (err) {
      console.error('weatherurl', err.message);
    }
  };

  // Fetches the aggregate weather data
  const getWeather = async function (city) {
    try {
      const data = await getCityData(city);
      const coords = await getCoords(data);
      const url = await getWeatherURL(coords);

      const response = await fetch(url);
      const weather = await response.json();

      console.log(weather);

      return weather;
    } catch (err) {
      console.error('getweather', err.message);
    }
  };

  //  Gets the current weather data from the aggregate
  const getCurrentWeather = async function (locationObj) {
    try {
      // const locationObj = await getWeather(city);

      const location = await locationObj;
      const currentWeather = location.current;

      return currentWeather;
    } catch (err) {
      console.error('getcurrentweather', err);
    }
  };

  //  Gets the hourly forecast from the aggregate
  const getHourlyWeather = async function (city) {
    try {
      const locationObj = await getWeather(city);

      const location = await locationObj;
      const weather48Hrs = location.hourly;
      const weather24Hrs = weather48Hrs.slice(0, 24);

      return weather24Hrs;
    } catch (err) {
      console.error('gethourlyweather', err.message);
    }
  };

  return {
    getWeather,
    getHourlyWeather,
    getCurrentWeather,
    getCityAndCountry,
  };
})();


/***/ }),

/***/ "./src/views/currWeatherView.js":
/*!**************************************!*\
  !*** ./src/views/currWeatherView.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "currWeatherView": () => (/* binding */ currWeatherView)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers */ "./src/helpers.js");


const currWeatherView = (function () {
  const currWeatherContainer = document.querySelector(
    '.current-weather.sub-container'
  );
  // const locationEl = document.querySelector('.cw--location');
  const tempEl = document.querySelector('.cw--temperature');
  const statusEl = document.querySelector('.cw--weather-status');
  const dateEl = document.querySelector('.cw--date');
  const timeEl = document.querySelector('.cw--time');

  const renderCurrentWeather = function (weather) {
    const currentWeather = weather;

    const weatherStatus = currentWeather.weather[0].description;
    const weatherStatusMain = currentWeather.weather[0].main;
    const uvi = currentWeather.uvi;
    const windSpeed = currentWeather.wind_speed;
    const heatIndex = currentWeather.feels_like;
    const humidity = currentWeather.humidity;
    const temp = currentWeather.temp;

    renderWeatherStatus(weatherStatus);
    renderTemp(temp);
  };

  const renderLocation = function (cityName, countryName) {
    const city = cityName;
    const country = countryName;

    const locationEl = document.createElement('div');
    locationEl.classList.add('cw--location');
    locationEl.textContent = `${city}, ${country}`;

    return locationEl;
  };

  const renderWeatherStatus = function (status) {
    const statusEl = document.createElement('div');
    statusEl.classList.add('cw--weather-status');
    statusEl.textContent = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.capitalize)(status);

    return statusEl;
  };

  const renderTemp = function (temp) {
    const tempEl = document.createElement('div');
    tempEl.classList.add('cw--temperature');

    const tempValueEl = document.createElement('span');
    tempValueEl.classList.add('cw--temp-value');
    tempValueEl.textContent = temp.toFixed(0);

    const tempUnitEl = document.createElement('span');
    tempUnitEl.classList.add('cw--temp-unit');
    tempUnitEl.textContent = '°C';

    tempEl.append(tempValueEl, tempUnitEl);

    return tempEl;
  };

  const renderDate = function () {
    // Get an API to render date in proper timezone

    const newDate = new Date();
  };

  return {
    renderCurrentWeather,
    renderLocation,
  };
})();


/***/ }),

/***/ "./src/views/hourView.js":
/*!*******************************!*\
  !*** ./src/views/hourView.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hourView": () => (/* binding */ hourView)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers */ "./src/helpers.js");


const hourView = (function () {
  const displayHourlyWeather = async function (weather) {
    const hourlyWeather = await weather;
    hourlyWeather.forEach((hour, i) => {
      _createWeatherDiv(i);
    });
  };

  const _createWeatherDiv = function (index) {
    const date = new Date();
    const toCorrect = +date.getHours() + +index;
    const hourToDisplay = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.getCorrectHour)(toCorrect);

    const forecastContainer = document.querySelector('.forecast-container');

    const currHourEl = document.createElement('span');
    currHourEl.textContent = hourToDisplay;
    currHourEl.classList.add('forecast');

    forecastContainer.append(currHourEl);
  };

  return {
    displayHourlyWeather,
  };
})();


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model */ "./src/model.js");
/* harmony import */ var _views_hourView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./views/hourView */ "./src/views/hourView.js");
/* harmony import */ var _views_currWeatherView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./views/currWeatherView */ "./src/views/currWeatherView.js");




//  TESTING

// const sampleData = getHourlyWeather(manilaLoc);
// hourView.displayHourlyWeather(sampleData);

const controlWeatherData = async function (location) {
  try {
  } catch (err) {
    console.error('controlweatherdata', err);
  }
};

const controlCurrentWeather = async function (location) {
  try {
    console.log(location);

    // 1 Get the city and country name
    const [city, country] = await _model__WEBPACK_IMPORTED_MODULE_0__.model.getCityAndCountry(location);

    // 2 Get the aggregate weather data for the location
    const locationWeather = await _model__WEBPACK_IMPORTED_MODULE_0__.model.getWeather(location);

    // 3 Get the current weather data only
    const currentWeather = await _model__WEBPACK_IMPORTED_MODULE_0__.model.getCurrentWeather(locationWeather);

    console.log('index currentweather', currentWeather);

    //  4 Display the results
    _views_currWeatherView__WEBPACK_IMPORTED_MODULE_2__.currWeatherView.renderCurrentWeather(currentWeather);
    _views_currWeatherView__WEBPACK_IMPORTED_MODULE_2__.currWeatherView.renderLocation(city, country);
  } catch (err) {
    console.error('controlcurrentweather', err);
  }
};

const controlPlaceholderWeather = function () {};

const init = function () {
  controlPlaceholderWeather();
  controlCurrentWeather('Manila');
};

init();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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STtBQUNKO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvcC13ZWF0aGVyLWFwcC8uL3NyYy9jb25maWcuanMiLCJ3ZWJwYWNrOi8vdG9wLXdlYXRoZXItYXBwLy4vc3JjL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vdG9wLXdlYXRoZXItYXBwLy4vc3JjL21vZGVsLmpzIiwid2VicGFjazovL3RvcC13ZWF0aGVyLWFwcC8uL3NyYy92aWV3cy9jdXJyV2VhdGhlclZpZXcuanMiLCJ3ZWJwYWNrOi8vdG9wLXdlYXRoZXItYXBwLy4vc3JjL3ZpZXdzL2hvdXJWaWV3LmpzIiwid2VicGFjazovL3RvcC13ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b3Atd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvcC13ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvcC13ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvcC13ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgQVBJX0tFWSA9IGA5ZjVhMGE5NTcxZjg2MDAwMDU0MTE5ZDY1YzBkNGY4NmA7XG5cbmV4cG9ydCBjb25zdCBBUElfVVJMID0gYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNWA7XG4iLCJleHBvcnQgY29uc3QgcGFkU3RhcnRIb3VyID0gZnVuY3Rpb24gKGhvdXIpIHtcbiAgY29uc3QgdG9QYWQgPSBob3VyICsgJyc7XG4gIHJldHVybiB0b1BhZC5wYWRTdGFydCgyLCAnMCcpO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldENvcnJlY3RIb3VyID0gZnVuY3Rpb24gKGhvdXIpIHtcbiAgY29uc3QgdG9QYWQgPSAraG91ciA8IDI0ID8gaG91ciA6ICtob3VyIC0gMjQ7XG5cbiAgY29uc3QgaG91clBhZGRlZCA9IHBhZFN0YXJ0SG91cih0b1BhZCk7XG5cbiAgcmV0dXJuIGhvdXJQYWRkZWQ7XG59O1xuXG5leHBvcnQgY29uc3QgY2FwaXRhbGl6ZSA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgY29uc3Qgc3RyQXJyID0gc3RyLnNwbGl0KCcgJyk7XG5cbiAgY29uc3QgY2FwaXRhbGl6ZUFyciA9IHN0ckFyci5tYXAoKHdvcmQpID0+XG4gICAgd29yZC5yZXBsYWNlKHdvcmRbMF0sIHdvcmRbMF0udG9VcHBlckNhc2UoKSlcbiAgKTtcblxuICByZXR1cm4gY2FwaXRhbGl6ZUFyci5qb2luKCcgJyk7XG59O1xuIiwiaW1wb3J0IHsgQVBJX0tFWSwgQVBJX1VSTCB9IGZyb20gJy4vY29uZmlnJztcblxuZXhwb3J0IGNvbnN0IG1vZGVsID0gKGZ1bmN0aW9uICgpIHtcbiAgbGV0IHdlYXRoZXJEYXRhO1xuXG4gIGNvbnN0IGdldENpdHlVUkwgPSBmdW5jdGlvbiAoY2l0eSkge1xuICAgIHJldHVybiBgJHtBUElfVVJMfS93ZWF0aGVyP3E9JHtjaXR5fSZ1bml0cz1tZXRyaWMmYXBwaWQ9JHtBUElfS0VZfWA7XG4gIH07XG5cbiAgLy8gRmV0Y2hlcyB0aGUgbG9jYXRpb24gZGF0YSBmb3IgdGhlIHF1ZXJpZWQgY2l0eVxuICBjb25zdCBnZXRDaXR5RGF0YSA9IGFzeW5jIGZ1bmN0aW9uIChjaXR5KSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goZ2V0Q2l0eVVSTChjaXR5KSk7XG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ2dldGNpdHlkYXRhJywgZXJyLm1lc3NhZ2UpO1xuICAgIH1cbiAgfTtcblxuICAvLyBGZXRjaGVzIHRoZSBjaXR5IGFuZCBjb3VudHJ5IG5hbWVcbiAgY29uc3QgZ2V0Q2l0eUFuZENvdW50cnkgPSBhc3luYyBmdW5jdGlvbiAoY2l0eSkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgZ2V0Q2l0eURhdGEoY2l0eSk7XG4gICAgICByZXR1cm4gW2RhdGEubmFtZSwgZGF0YS5zeXMuY291bnRyeV07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdnZXRjaXR5YW5kY291bnRyeScsIGVyci5tZXNzYWdlKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gRmV0Y2hlcyB0aGUgY29vcmRpbmF0ZXMgdG8gYmUgdXNlZCBmb3IgdGhlIHdlYXRoZXIgVVJMXG4gIGNvbnN0IGdldENvb3JkcyA9IGFzeW5jIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNpdHkgPSBhd2FpdCBkYXRhO1xuICAgICAgY29uc3QgbGF0ID0gK2NpdHkuY29vcmQubGF0LnRvRml4ZWQoMik7XG4gICAgICBjb25zdCBsb25nID0gK2NpdHkuY29vcmQubG9uLnRvRml4ZWQoMik7XG5cbiAgICAgIHJldHVybiBbbGF0LCBsb25nXTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ2Nvb3JkcycsIGVyci5tZXNzYWdlKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gUmV0dXJucyB0aGUgVVJMIGZvciBhbm90aGVyIGZldGNoIGNhbGxcbiAgY29uc3QgZ2V0V2VhdGhlclVSTCA9IGFzeW5jIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNvb3JkcyA9IGF3YWl0IGRhdGE7XG5cbiAgICAgIGNvbnN0IFtsYXQsIGxvbmddID0gY29vcmRzO1xuXG4gICAgICByZXR1cm4gYCR7QVBJX1VSTH0vb25lY2FsbD9sYXQ9JHtsYXR9Jmxvbj0ke2xvbmd9JnVuaXRzPW1ldHJpYyZleGNsdWRlPW1pbnV0ZWx5JmFwcGlkPSR7QVBJX0tFWX1gO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcignd2VhdGhlcnVybCcsIGVyci5tZXNzYWdlKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gRmV0Y2hlcyB0aGUgYWdncmVnYXRlIHdlYXRoZXIgZGF0YVxuICBjb25zdCBnZXRXZWF0aGVyID0gYXN5bmMgZnVuY3Rpb24gKGNpdHkpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGdldENpdHlEYXRhKGNpdHkpO1xuICAgICAgY29uc3QgY29vcmRzID0gYXdhaXQgZ2V0Q29vcmRzKGRhdGEpO1xuICAgICAgY29uc3QgdXJsID0gYXdhaXQgZ2V0V2VhdGhlclVSTChjb29yZHMpO1xuXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCk7XG4gICAgICBjb25zdCB3ZWF0aGVyID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXG4gICAgICBjb25zb2xlLmxvZyh3ZWF0aGVyKTtcblxuICAgICAgcmV0dXJuIHdlYXRoZXI7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdnZXR3ZWF0aGVyJywgZXJyLm1lc3NhZ2UpO1xuICAgIH1cbiAgfTtcblxuICAvLyAgR2V0cyB0aGUgY3VycmVudCB3ZWF0aGVyIGRhdGEgZnJvbSB0aGUgYWdncmVnYXRlXG4gIGNvbnN0IGdldEN1cnJlbnRXZWF0aGVyID0gYXN5bmMgZnVuY3Rpb24gKGxvY2F0aW9uT2JqKSB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIGNvbnN0IGxvY2F0aW9uT2JqID0gYXdhaXQgZ2V0V2VhdGhlcihjaXR5KTtcblxuICAgICAgY29uc3QgbG9jYXRpb24gPSBhd2FpdCBsb2NhdGlvbk9iajtcbiAgICAgIGNvbnN0IGN1cnJlbnRXZWF0aGVyID0gbG9jYXRpb24uY3VycmVudDtcblxuICAgICAgcmV0dXJuIGN1cnJlbnRXZWF0aGVyO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcignZ2V0Y3VycmVudHdlYXRoZXInLCBlcnIpO1xuICAgIH1cbiAgfTtcblxuICAvLyAgR2V0cyB0aGUgaG91cmx5IGZvcmVjYXN0IGZyb20gdGhlIGFnZ3JlZ2F0ZVxuICBjb25zdCBnZXRIb3VybHlXZWF0aGVyID0gYXN5bmMgZnVuY3Rpb24gKGNpdHkpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgbG9jYXRpb25PYmogPSBhd2FpdCBnZXRXZWF0aGVyKGNpdHkpO1xuXG4gICAgICBjb25zdCBsb2NhdGlvbiA9IGF3YWl0IGxvY2F0aW9uT2JqO1xuICAgICAgY29uc3Qgd2VhdGhlcjQ4SHJzID0gbG9jYXRpb24uaG91cmx5O1xuICAgICAgY29uc3Qgd2VhdGhlcjI0SHJzID0gd2VhdGhlcjQ4SHJzLnNsaWNlKDAsIDI0KTtcblxuICAgICAgcmV0dXJuIHdlYXRoZXIyNEhycztcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ2dldGhvdXJseXdlYXRoZXInLCBlcnIubWVzc2FnZSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7XG4gICAgZ2V0V2VhdGhlcixcbiAgICBnZXRIb3VybHlXZWF0aGVyLFxuICAgIGdldEN1cnJlbnRXZWF0aGVyLFxuICAgIGdldENpdHlBbmRDb3VudHJ5LFxuICB9O1xufSkoKTtcbiIsImltcG9ydCB7IGNhcGl0YWxpemUgfSBmcm9tICcuLi9oZWxwZXJzJztcblxuZXhwb3J0IGNvbnN0IGN1cnJXZWF0aGVyVmlldyA9IChmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGN1cnJXZWF0aGVyQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAnLmN1cnJlbnQtd2VhdGhlci5zdWItY29udGFpbmVyJ1xuICApO1xuICAvLyBjb25zdCBsb2NhdGlvbkVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmN3LS1sb2NhdGlvbicpO1xuICBjb25zdCB0ZW1wRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3ctLXRlbXBlcmF0dXJlJyk7XG4gIGNvbnN0IHN0YXR1c0VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmN3LS13ZWF0aGVyLXN0YXR1cycpO1xuICBjb25zdCBkYXRlRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3ctLWRhdGUnKTtcbiAgY29uc3QgdGltZUVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmN3LS10aW1lJyk7XG5cbiAgY29uc3QgcmVuZGVyQ3VycmVudFdlYXRoZXIgPSBmdW5jdGlvbiAod2VhdGhlcikge1xuICAgIGNvbnN0IGN1cnJlbnRXZWF0aGVyID0gd2VhdGhlcjtcblxuICAgIGNvbnN0IHdlYXRoZXJTdGF0dXMgPSBjdXJyZW50V2VhdGhlci53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uO1xuICAgIGNvbnN0IHdlYXRoZXJTdGF0dXNNYWluID0gY3VycmVudFdlYXRoZXIud2VhdGhlclswXS5tYWluO1xuICAgIGNvbnN0IHV2aSA9IGN1cnJlbnRXZWF0aGVyLnV2aTtcbiAgICBjb25zdCB3aW5kU3BlZWQgPSBjdXJyZW50V2VhdGhlci53aW5kX3NwZWVkO1xuICAgIGNvbnN0IGhlYXRJbmRleCA9IGN1cnJlbnRXZWF0aGVyLmZlZWxzX2xpa2U7XG4gICAgY29uc3QgaHVtaWRpdHkgPSBjdXJyZW50V2VhdGhlci5odW1pZGl0eTtcbiAgICBjb25zdCB0ZW1wID0gY3VycmVudFdlYXRoZXIudGVtcDtcblxuICAgIHJlbmRlcldlYXRoZXJTdGF0dXMod2VhdGhlclN0YXR1cyk7XG4gICAgcmVuZGVyVGVtcCh0ZW1wKTtcbiAgfTtcblxuICBjb25zdCByZW5kZXJMb2NhdGlvbiA9IGZ1bmN0aW9uIChjaXR5TmFtZSwgY291bnRyeU5hbWUpIHtcbiAgICBjb25zdCBjaXR5ID0gY2l0eU5hbWU7XG4gICAgY29uc3QgY291bnRyeSA9IGNvdW50cnlOYW1lO1xuXG4gICAgY29uc3QgbG9jYXRpb25FbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGxvY2F0aW9uRWwuY2xhc3NMaXN0LmFkZCgnY3ctLWxvY2F0aW9uJyk7XG4gICAgbG9jYXRpb25FbC50ZXh0Q29udGVudCA9IGAke2NpdHl9LCAke2NvdW50cnl9YDtcblxuICAgIHJldHVybiBsb2NhdGlvbkVsO1xuICB9O1xuXG4gIGNvbnN0IHJlbmRlcldlYXRoZXJTdGF0dXMgPSBmdW5jdGlvbiAoc3RhdHVzKSB7XG4gICAgY29uc3Qgc3RhdHVzRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBzdGF0dXNFbC5jbGFzc0xpc3QuYWRkKCdjdy0td2VhdGhlci1zdGF0dXMnKTtcbiAgICBzdGF0dXNFbC50ZXh0Q29udGVudCA9IGNhcGl0YWxpemUoc3RhdHVzKTtcblxuICAgIHJldHVybiBzdGF0dXNFbDtcbiAgfTtcblxuICBjb25zdCByZW5kZXJUZW1wID0gZnVuY3Rpb24gKHRlbXApIHtcbiAgICBjb25zdCB0ZW1wRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0ZW1wRWwuY2xhc3NMaXN0LmFkZCgnY3ctLXRlbXBlcmF0dXJlJyk7XG5cbiAgICBjb25zdCB0ZW1wVmFsdWVFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICB0ZW1wVmFsdWVFbC5jbGFzc0xpc3QuYWRkKCdjdy0tdGVtcC12YWx1ZScpO1xuICAgIHRlbXBWYWx1ZUVsLnRleHRDb250ZW50ID0gdGVtcC50b0ZpeGVkKDApO1xuXG4gICAgY29uc3QgdGVtcFVuaXRFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICB0ZW1wVW5pdEVsLmNsYXNzTGlzdC5hZGQoJ2N3LS10ZW1wLXVuaXQnKTtcbiAgICB0ZW1wVW5pdEVsLnRleHRDb250ZW50ID0gJ8KwQyc7XG5cbiAgICB0ZW1wRWwuYXBwZW5kKHRlbXBWYWx1ZUVsLCB0ZW1wVW5pdEVsKTtcblxuICAgIHJldHVybiB0ZW1wRWw7XG4gIH07XG5cbiAgY29uc3QgcmVuZGVyRGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBHZXQgYW4gQVBJIHRvIHJlbmRlciBkYXRlIGluIHByb3BlciB0aW1lem9uZVxuXG4gICAgY29uc3QgbmV3RGF0ZSA9IG5ldyBEYXRlKCk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICByZW5kZXJDdXJyZW50V2VhdGhlcixcbiAgICByZW5kZXJMb2NhdGlvbixcbiAgfTtcbn0pKCk7XG4iLCJpbXBvcnQgeyBnZXRDb3JyZWN0SG91ciB9IGZyb20gJy4uL2hlbHBlcnMnO1xuXG5leHBvcnQgY29uc3QgaG91clZpZXcgPSAoZnVuY3Rpb24gKCkge1xuICBjb25zdCBkaXNwbGF5SG91cmx5V2VhdGhlciA9IGFzeW5jIGZ1bmN0aW9uICh3ZWF0aGVyKSB7XG4gICAgY29uc3QgaG91cmx5V2VhdGhlciA9IGF3YWl0IHdlYXRoZXI7XG4gICAgaG91cmx5V2VhdGhlci5mb3JFYWNoKChob3VyLCBpKSA9PiB7XG4gICAgICBfY3JlYXRlV2VhdGhlckRpdihpKTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBfY3JlYXRlV2VhdGhlckRpdiA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IHRvQ29ycmVjdCA9ICtkYXRlLmdldEhvdXJzKCkgKyAraW5kZXg7XG4gICAgY29uc3QgaG91clRvRGlzcGxheSA9IGdldENvcnJlY3RIb3VyKHRvQ29ycmVjdCk7XG5cbiAgICBjb25zdCBmb3JlY2FzdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JlY2FzdC1jb250YWluZXInKTtcblxuICAgIGNvbnN0IGN1cnJIb3VyRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY3VyckhvdXJFbC50ZXh0Q29udGVudCA9IGhvdXJUb0Rpc3BsYXk7XG4gICAgY3VyckhvdXJFbC5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdCcpO1xuXG4gICAgZm9yZWNhc3RDb250YWluZXIuYXBwZW5kKGN1cnJIb3VyRWwpO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgZGlzcGxheUhvdXJseVdlYXRoZXIsXG4gIH07XG59KSgpO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBtb2RlbCB9IGZyb20gJy4vbW9kZWwnO1xuaW1wb3J0IHsgaG91clZpZXcgfSBmcm9tICcuL3ZpZXdzL2hvdXJWaWV3JztcbmltcG9ydCB7IGN1cnJXZWF0aGVyVmlldyB9IGZyb20gJy4vdmlld3MvY3VycldlYXRoZXJWaWV3JztcblxuLy8gIFRFU1RJTkdcblxuLy8gY29uc3Qgc2FtcGxlRGF0YSA9IGdldEhvdXJseVdlYXRoZXIobWFuaWxhTG9jKTtcbi8vIGhvdXJWaWV3LmRpc3BsYXlIb3VybHlXZWF0aGVyKHNhbXBsZURhdGEpO1xuXG5jb25zdCBjb250cm9sV2VhdGhlckRhdGEgPSBhc3luYyBmdW5jdGlvbiAobG9jYXRpb24pIHtcbiAgdHJ5IHtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcignY29udHJvbHdlYXRoZXJkYXRhJywgZXJyKTtcbiAgfVxufTtcblxuY29uc3QgY29udHJvbEN1cnJlbnRXZWF0aGVyID0gYXN5bmMgZnVuY3Rpb24gKGxvY2F0aW9uKSB7XG4gIHRyeSB7XG4gICAgY29uc29sZS5sb2cobG9jYXRpb24pO1xuXG4gICAgLy8gMSBHZXQgdGhlIGNpdHkgYW5kIGNvdW50cnkgbmFtZVxuICAgIGNvbnN0IFtjaXR5LCBjb3VudHJ5XSA9IGF3YWl0IG1vZGVsLmdldENpdHlBbmRDb3VudHJ5KGxvY2F0aW9uKTtcblxuICAgIC8vIDIgR2V0IHRoZSBhZ2dyZWdhdGUgd2VhdGhlciBkYXRhIGZvciB0aGUgbG9jYXRpb25cbiAgICBjb25zdCBsb2NhdGlvbldlYXRoZXIgPSBhd2FpdCBtb2RlbC5nZXRXZWF0aGVyKGxvY2F0aW9uKTtcblxuICAgIC8vIDMgR2V0IHRoZSBjdXJyZW50IHdlYXRoZXIgZGF0YSBvbmx5XG4gICAgY29uc3QgY3VycmVudFdlYXRoZXIgPSBhd2FpdCBtb2RlbC5nZXRDdXJyZW50V2VhdGhlcihsb2NhdGlvbldlYXRoZXIpO1xuXG4gICAgY29uc29sZS5sb2coJ2luZGV4IGN1cnJlbnR3ZWF0aGVyJywgY3VycmVudFdlYXRoZXIpO1xuXG4gICAgLy8gIDQgRGlzcGxheSB0aGUgcmVzdWx0c1xuICAgIGN1cnJXZWF0aGVyVmlldy5yZW5kZXJDdXJyZW50V2VhdGhlcihjdXJyZW50V2VhdGhlcik7XG4gICAgY3VycldlYXRoZXJWaWV3LnJlbmRlckxvY2F0aW9uKGNpdHksIGNvdW50cnkpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmVycm9yKCdjb250cm9sY3VycmVudHdlYXRoZXInLCBlcnIpO1xuICB9XG59O1xuXG5jb25zdCBjb250cm9sUGxhY2Vob2xkZXJXZWF0aGVyID0gZnVuY3Rpb24gKCkge307XG5cbmNvbnN0IGluaXQgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnRyb2xQbGFjZWhvbGRlcldlYXRoZXIoKTtcbiAgY29udHJvbEN1cnJlbnRXZWF0aGVyKCdNYW5pbGEnKTtcbn07XG5cbmluaXQoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
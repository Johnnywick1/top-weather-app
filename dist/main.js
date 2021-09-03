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
/* harmony export */   "getCorrectHour": () => (/* binding */ getCorrectHour)
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
  let query;
  let cityName;
  let countryName;

  const getCityURL = function (city) {
    return `${_config__WEBPACK_IMPORTED_MODULE_0__.API_URL}/weather?q=${city}&units=metric&appid=${_config__WEBPACK_IMPORTED_MODULE_0__.API_KEY}`;
  };

  const getCityData = async function (city) {
    try {
      const response = await fetch(getCityURL(city));
      const data = await response.json();

      cityName = data.name;
      countryName = data.sys.country;

      console.log(`${cityName}, ${countryName}`);

      return data;
    } catch (err) {
      console.error('getdata', err.message);
    }
  };

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

  const getWeatherURL = async function (data) {
    try {
      const coords = await data;

      const [lat, long] = coords;

      return `${_config__WEBPACK_IMPORTED_MODULE_0__.API_URL}/onecall?lat=${lat}&lon=${long}&units=metric&exclude=minutely&appid=${_config__WEBPACK_IMPORTED_MODULE_0__.API_KEY}`;
    } catch (err) {
      console.error('weatherurl', err.message);
    }
  };

  const getWeather = async function (city) {
    try {
      const data = await getCityData(city);
      const coords = await getCoords(data);
      const url = await getWeatherURL(coords);

      const response = await fetch(url);
      const weather = await response.json();

      return weather;
    } catch (err) {
      console.error(err.message);
    }
  };

  const getCurrentWeather = async function (locationObj) {
    try {
      const location = await locationObj;
      const currentWeather = location.current;

      return currentWeather;
    } catch (err) {
      console.error('getcurrentweather', err);
    }
  };

  const getHourlyWeather = async function (locationObj) {
    try {
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
    cityName,
    countryName,
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
const currWeatherView = (function () {
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

const controlCurrentWeather = async function () {
  try {
    const city = await _model__WEBPACK_IMPORTED_MODULE_0__.model.cityName;
    const country = await _model__WEBPACK_IMPORTED_MODULE_0__.model.countryName;

    const manilaLoc = _model__WEBPACK_IMPORTED_MODULE_0__.model.getWeather('Manila');
    // const sampleData = getHourlyWeather(manilaLoc);
    // hourView.displayHourlyWeather(sampleData);

    const sampleData2 = _model__WEBPACK_IMPORTED_MODULE_0__.model.getCurrentWeather(manilaLoc);
    _views_currWeatherView__WEBPACK_IMPORTED_MODULE_2__.currWeatherView.displayCurrentWeather(sampleData2);

    _views_currWeatherView__WEBPACK_IMPORTED_MODULE_2__.currWeatherView.displayLocation(city, country);
  } catch (err) {
    console.error('controlcurrentweather', err);
  }
};

controlCurrentWeather();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBTzs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZBO0FBQ1A7QUFDQTtBQUNBOztBQUVPO0FBQ1A7O0FBRUE7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ1g0Qzs7QUFFckM7QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxjQUFjLDRDQUFPLENBQUMsYUFBYSxLQUFLLHNCQUFzQiw0Q0FBTyxDQUFDO0FBQ3RFOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEscUJBQXFCLFNBQVMsSUFBSSxZQUFZOztBQUU5QztBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLGdCQUFnQiw0Q0FBTyxDQUFDLGVBQWUsSUFBSSxPQUFPLEtBQUssdUNBQXVDLDRDQUFPLENBQUM7QUFDdEcsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ2hHTTtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGdDQUFnQyxLQUFLLElBQUksUUFBUTtBQUNqRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2QjJDOztBQUVyQztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQix3REFBYzs7QUFFeEM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7OztVQzNCRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOZ0M7QUFDWTtBQUNjOztBQUUxRDs7QUFFQTtBQUNBO0FBQ0EsdUJBQXVCLGtEQUFjO0FBQ3JDLDBCQUEwQixxREFBaUI7O0FBRTNDLHNCQUFzQixvREFBZ0I7QUFDdEM7QUFDQTs7QUFFQSx3QkFBd0IsMkRBQXVCO0FBQy9DLElBQUkseUZBQXFDOztBQUV6QyxJQUFJLG1GQUErQjtBQUNuQyxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9wLXdlYXRoZXItYXBwLy4vc3JjL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly90b3Atd2VhdGhlci1hcHAvLi9zcmMvaGVscGVycy5qcyIsIndlYnBhY2s6Ly90b3Atd2VhdGhlci1hcHAvLi9zcmMvbW9kZWwuanMiLCJ3ZWJwYWNrOi8vdG9wLXdlYXRoZXItYXBwLy4vc3JjL3ZpZXdzL2N1cnJXZWF0aGVyVmlldy5qcyIsIndlYnBhY2s6Ly90b3Atd2VhdGhlci1hcHAvLi9zcmMvdmlld3MvaG91clZpZXcuanMiLCJ3ZWJwYWNrOi8vdG9wLXdlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvcC13ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9wLXdlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9wLXdlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9wLXdlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBBUElfS0VZID0gYDlmNWEwYTk1NzFmODYwMDAwNTQxMTlkNjVjMGQ0Zjg2YDtcblxuZXhwb3J0IGNvbnN0IEFQSV9VUkwgPSBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41YDtcbiIsImV4cG9ydCBjb25zdCBwYWRTdGFydEhvdXIgPSBmdW5jdGlvbiAoaG91cikge1xuICBjb25zdCB0b1BhZCA9IGhvdXIgKyAnJztcbiAgcmV0dXJuIHRvUGFkLnBhZFN0YXJ0KDIsICcwJyk7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0Q29ycmVjdEhvdXIgPSBmdW5jdGlvbiAoaG91cikge1xuICBjb25zdCB0b1BhZCA9ICtob3VyIDwgMjQgPyBob3VyIDogK2hvdXIgLSAyNDtcblxuICBjb25zdCBob3VyUGFkZGVkID0gcGFkU3RhcnRIb3VyKHRvUGFkKTtcblxuICByZXR1cm4gaG91clBhZGRlZDtcbn07XG4iLCJpbXBvcnQgeyBBUElfS0VZLCBBUElfVVJMIH0gZnJvbSAnLi9jb25maWcnO1xuXG5leHBvcnQgY29uc3QgbW9kZWwgPSAoZnVuY3Rpb24gKCkge1xuICBsZXQgcXVlcnk7XG4gIGxldCBjaXR5TmFtZTtcbiAgbGV0IGNvdW50cnlOYW1lO1xuXG4gIGNvbnN0IGdldENpdHlVUkwgPSBmdW5jdGlvbiAoY2l0eSkge1xuICAgIHJldHVybiBgJHtBUElfVVJMfS93ZWF0aGVyP3E9JHtjaXR5fSZ1bml0cz1tZXRyaWMmYXBwaWQ9JHtBUElfS0VZfWA7XG4gIH07XG5cbiAgY29uc3QgZ2V0Q2l0eURhdGEgPSBhc3luYyBmdW5jdGlvbiAoY2l0eSkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGdldENpdHlVUkwoY2l0eSkpO1xuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblxuICAgICAgY2l0eU5hbWUgPSBkYXRhLm5hbWU7XG4gICAgICBjb3VudHJ5TmFtZSA9IGRhdGEuc3lzLmNvdW50cnk7XG5cbiAgICAgIGNvbnNvbGUubG9nKGAke2NpdHlOYW1lfSwgJHtjb3VudHJ5TmFtZX1gKTtcblxuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdnZXRkYXRhJywgZXJyLm1lc3NhZ2UpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBnZXRDb29yZHMgPSBhc3luYyBmdW5jdGlvbiAoZGF0YSkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBjaXR5ID0gYXdhaXQgZGF0YTtcbiAgICAgIGNvbnN0IGxhdCA9ICtjaXR5LmNvb3JkLmxhdC50b0ZpeGVkKDIpO1xuICAgICAgY29uc3QgbG9uZyA9ICtjaXR5LmNvb3JkLmxvbi50b0ZpeGVkKDIpO1xuXG4gICAgICByZXR1cm4gW2xhdCwgbG9uZ107XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdjb29yZHMnLCBlcnIubWVzc2FnZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGdldFdlYXRoZXJVUkwgPSBhc3luYyBmdW5jdGlvbiAoZGF0YSkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBjb29yZHMgPSBhd2FpdCBkYXRhO1xuXG4gICAgICBjb25zdCBbbGF0LCBsb25nXSA9IGNvb3JkcztcblxuICAgICAgcmV0dXJuIGAke0FQSV9VUkx9L29uZWNhbGw/bGF0PSR7bGF0fSZsb249JHtsb25nfSZ1bml0cz1tZXRyaWMmZXhjbHVkZT1taW51dGVseSZhcHBpZD0ke0FQSV9LRVl9YDtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ3dlYXRoZXJ1cmwnLCBlcnIubWVzc2FnZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGdldFdlYXRoZXIgPSBhc3luYyBmdW5jdGlvbiAoY2l0eSkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgZ2V0Q2l0eURhdGEoY2l0eSk7XG4gICAgICBjb25zdCBjb29yZHMgPSBhd2FpdCBnZXRDb29yZHMoZGF0YSk7XG4gICAgICBjb25zdCB1cmwgPSBhd2FpdCBnZXRXZWF0aGVyVVJMKGNvb3Jkcyk7XG5cbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsKTtcbiAgICAgIGNvbnN0IHdlYXRoZXIgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cbiAgICAgIHJldHVybiB3ZWF0aGVyO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIubWVzc2FnZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGdldEN1cnJlbnRXZWF0aGVyID0gYXN5bmMgZnVuY3Rpb24gKGxvY2F0aW9uT2JqKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGxvY2F0aW9uID0gYXdhaXQgbG9jYXRpb25PYmo7XG4gICAgICBjb25zdCBjdXJyZW50V2VhdGhlciA9IGxvY2F0aW9uLmN1cnJlbnQ7XG5cbiAgICAgIHJldHVybiBjdXJyZW50V2VhdGhlcjtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ2dldGN1cnJlbnR3ZWF0aGVyJywgZXJyKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZ2V0SG91cmx5V2VhdGhlciA9IGFzeW5jIGZ1bmN0aW9uIChsb2NhdGlvbk9iaikge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBsb2NhdGlvbiA9IGF3YWl0IGxvY2F0aW9uT2JqO1xuICAgICAgY29uc3Qgd2VhdGhlcjQ4SHJzID0gbG9jYXRpb24uaG91cmx5O1xuICAgICAgY29uc3Qgd2VhdGhlcjI0SHJzID0gd2VhdGhlcjQ4SHJzLnNsaWNlKDAsIDI0KTtcblxuICAgICAgcmV0dXJuIHdlYXRoZXIyNEhycztcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ2dldGhvdXJseXdlYXRoZXInLCBlcnIubWVzc2FnZSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7XG4gICAgZ2V0V2VhdGhlcixcbiAgICBnZXRIb3VybHlXZWF0aGVyLFxuICAgIGdldEN1cnJlbnRXZWF0aGVyLFxuICAgIGNpdHlOYW1lLFxuICAgIGNvdW50cnlOYW1lLFxuICB9O1xufSkoKTtcbiIsImV4cG9ydCBjb25zdCBjdXJyV2VhdGhlclZpZXcgPSAoZnVuY3Rpb24gKCkge1xuICBjb25zdCBsb2NhdGlvbkVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmN3LS1sb2NhdGlvbicpO1xuICBjb25zdCB0ZW1wRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3ctLXRlbXBlcmF0dXJlJyk7XG4gIGNvbnN0IHN0YXR1c0VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmN3LS13ZWF0aGVyLXN0YXR1cycpO1xuICBjb25zdCBkYXRlRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3ctLWRhdGUnKTtcbiAgY29uc3QgdGltZUVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmN3LS10aW1lJyk7XG5cbiAgY29uc3QgZGlzcGxheUN1cnJlbnRXZWF0aGVyID0gYXN5bmMgZnVuY3Rpb24gKHdlYXRoZXIpIHtcbiAgICBjb25zdCBjdXJyZW50V2VhdGhlciA9IGF3YWl0IHdlYXRoZXI7XG4gICAgY29uc29sZS5sb2coY3VycmVudFdlYXRoZXIpO1xuICB9O1xuXG4gIGNvbnN0IGRpc3BsYXlMb2NhdGlvbiA9IGFzeW5jIGZ1bmN0aW9uIChjaXR5TmFtZSwgY291bnRyeU5hbWUpIHtcbiAgICBjb25zdCBjaXR5ID0gYXdhaXQgY2l0eU5hbWU7XG4gICAgY29uc3QgY291bnRyeSA9IGF3YWl0IGNvdW50cnlOYW1lO1xuXG4gICAgbG9jYXRpb25FbC50ZXh0Q29udGVudCA9IGAke2NpdHl9LCAke2NvdW50cnl9YDtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGRpc3BsYXlDdXJyZW50V2VhdGhlcixcbiAgICBkaXNwbGF5TG9jYXRpb24sXG4gIH07XG59KSgpO1xuIiwiaW1wb3J0IHsgZ2V0Q29ycmVjdEhvdXIgfSBmcm9tICcuLi9oZWxwZXJzJztcblxuZXhwb3J0IGNvbnN0IGhvdXJWaWV3ID0gKGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgZGlzcGxheUhvdXJseVdlYXRoZXIgPSBhc3luYyBmdW5jdGlvbiAod2VhdGhlcikge1xuICAgIGNvbnN0IGhvdXJseVdlYXRoZXIgPSBhd2FpdCB3ZWF0aGVyO1xuICAgIGhvdXJseVdlYXRoZXIuZm9yRWFjaCgoaG91ciwgaSkgPT4ge1xuICAgICAgX2NyZWF0ZVdlYXRoZXJEaXYoaSk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgX2NyZWF0ZVdlYXRoZXJEaXYgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoKTtcbiAgICBjb25zdCB0b0NvcnJlY3QgPSArZGF0ZS5nZXRIb3VycygpICsgK2luZGV4O1xuICAgIGNvbnN0IGhvdXJUb0Rpc3BsYXkgPSBnZXRDb3JyZWN0SG91cih0b0NvcnJlY3QpO1xuXG4gICAgY29uc3QgZm9yZWNhc3RDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9yZWNhc3QtY29udGFpbmVyJyk7XG5cbiAgICBjb25zdCBjdXJySG91ckVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGN1cnJIb3VyRWwudGV4dENvbnRlbnQgPSBob3VyVG9EaXNwbGF5O1xuICAgIGN1cnJIb3VyRWwuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3QnKTtcblxuICAgIGZvcmVjYXN0Q29udGFpbmVyLmFwcGVuZChjdXJySG91ckVsKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGRpc3BsYXlIb3VybHlXZWF0aGVyLFxuICB9O1xufSkoKTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgbW9kZWwgfSBmcm9tICcuL21vZGVsJztcbmltcG9ydCB7IGhvdXJWaWV3IH0gZnJvbSAnLi92aWV3cy9ob3VyVmlldyc7XG5pbXBvcnQgeyBjdXJyV2VhdGhlclZpZXcgfSBmcm9tICcuL3ZpZXdzL2N1cnJXZWF0aGVyVmlldyc7XG5cbi8vICBURVNUSU5HXG5cbmNvbnN0IGNvbnRyb2xDdXJyZW50V2VhdGhlciA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBjaXR5ID0gYXdhaXQgbW9kZWwuY2l0eU5hbWU7XG4gICAgY29uc3QgY291bnRyeSA9IGF3YWl0IG1vZGVsLmNvdW50cnlOYW1lO1xuXG4gICAgY29uc3QgbWFuaWxhTG9jID0gbW9kZWwuZ2V0V2VhdGhlcignTWFuaWxhJyk7XG4gICAgLy8gY29uc3Qgc2FtcGxlRGF0YSA9IGdldEhvdXJseVdlYXRoZXIobWFuaWxhTG9jKTtcbiAgICAvLyBob3VyVmlldy5kaXNwbGF5SG91cmx5V2VhdGhlcihzYW1wbGVEYXRhKTtcblxuICAgIGNvbnN0IHNhbXBsZURhdGEyID0gbW9kZWwuZ2V0Q3VycmVudFdlYXRoZXIobWFuaWxhTG9jKTtcbiAgICBjdXJyV2VhdGhlclZpZXcuZGlzcGxheUN1cnJlbnRXZWF0aGVyKHNhbXBsZURhdGEyKTtcblxuICAgIGN1cnJXZWF0aGVyVmlldy5kaXNwbGF5TG9jYXRpb24oY2l0eSwgY291bnRyeSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ2NvbnRyb2xjdXJyZW50d2VhdGhlcicsIGVycik7XG4gIH1cbn07XG5cbmNvbnRyb2xDdXJyZW50V2VhdGhlcigpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
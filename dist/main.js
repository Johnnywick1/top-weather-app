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
      console.log(hour);
      _createWeatherDiv(i);
    });
  };

  const _createWeatherDiv = function (index) {
    const date = new Date();
    const toCorrect = +date.getHours() + +index;
    const hourToDisplay = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.getCorrectHour)(toCorrect);

    const hourlyWeatherContainer = document.querySelector('.weather-container');

    const currHourEl = document.createElement('span');
    currHourEl.textContent = hourToDisplay;
    currHourEl.style.padding = '0.5rem';

    hourlyWeatherContainer.append(currHourEl);
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
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "./src/config.js");
/* harmony import */ var _views_hourView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./views/hourView */ "./src/views/hourView.js");



let query;

const getCityURL = function (city) {
  return `${_config__WEBPACK_IMPORTED_MODULE_0__.API_URL}/weather?q=${city}&units=metric&appid=${_config__WEBPACK_IMPORTED_MODULE_0__.API_KEY}`;
};

const getCityData = async function (city) {
  try {
    const response = await fetch(getCityURL(city));
    const data = await response.json();

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

const manilaLoc = getWeather('Manila');

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

const sampleData = getHourlyWeather(manilaLoc);

_views_hourView__WEBPACK_IMPORTED_MODULE_1__.hourView.displayHourlyWeather(sampleData);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBTzs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZBO0FBQ1A7QUFDQTtBQUNBOztBQUVPO0FBQ1A7O0FBRUE7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ1g0Qzs7QUFFckM7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQix3REFBYzs7QUFFeEM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7OztVQzVCRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ040QztBQUNBOztBQUU1Qzs7QUFFQTtBQUNBLFlBQVksNENBQU8sQ0FBQyxhQUFhLEtBQUssc0JBQXNCLDRDQUFPLENBQUM7QUFDcEU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxjQUFjLDRDQUFPLENBQUMsZUFBZSxJQUFJLE9BQU8sS0FBSyx1Q0FBdUMsNENBQU8sQ0FBQztBQUNwRyxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsMEVBQTZCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9wLXdlYXRoZXItYXBwLy4vc3JjL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly90b3Atd2VhdGhlci1hcHAvLi9zcmMvaGVscGVycy5qcyIsIndlYnBhY2s6Ly90b3Atd2VhdGhlci1hcHAvLi9zcmMvdmlld3MvaG91clZpZXcuanMiLCJ3ZWJwYWNrOi8vdG9wLXdlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvcC13ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9wLXdlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9wLXdlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9wLXdlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBBUElfS0VZID0gYDlmNWEwYTk1NzFmODYwMDAwNTQxMTlkNjVjMGQ0Zjg2YDtcblxuZXhwb3J0IGNvbnN0IEFQSV9VUkwgPSBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41YDtcbiIsImV4cG9ydCBjb25zdCBwYWRTdGFydEhvdXIgPSBmdW5jdGlvbiAoaG91cikge1xuICBjb25zdCB0b1BhZCA9IGhvdXIgKyAnJztcbiAgcmV0dXJuIHRvUGFkLnBhZFN0YXJ0KDIsICcwJyk7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0Q29ycmVjdEhvdXIgPSBmdW5jdGlvbiAoaG91cikge1xuICBjb25zdCB0b1BhZCA9ICtob3VyIDwgMjQgPyBob3VyIDogK2hvdXIgLSAyNDtcblxuICBjb25zdCBob3VyUGFkZGVkID0gcGFkU3RhcnRIb3VyKHRvUGFkKTtcblxuICByZXR1cm4gaG91clBhZGRlZDtcbn07XG4iLCJpbXBvcnQgeyBnZXRDb3JyZWN0SG91ciB9IGZyb20gJy4uL2hlbHBlcnMnO1xuXG5leHBvcnQgY29uc3QgaG91clZpZXcgPSAoZnVuY3Rpb24gKCkge1xuICBjb25zdCBkaXNwbGF5SG91cmx5V2VhdGhlciA9IGFzeW5jIGZ1bmN0aW9uICh3ZWF0aGVyKSB7XG4gICAgY29uc3QgaG91cmx5V2VhdGhlciA9IGF3YWl0IHdlYXRoZXI7XG4gICAgaG91cmx5V2VhdGhlci5mb3JFYWNoKChob3VyLCBpKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhob3VyKTtcbiAgICAgIF9jcmVhdGVXZWF0aGVyRGl2KGkpO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IF9jcmVhdGVXZWF0aGVyRGl2ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgdG9Db3JyZWN0ID0gK2RhdGUuZ2V0SG91cnMoKSArICtpbmRleDtcbiAgICBjb25zdCBob3VyVG9EaXNwbGF5ID0gZ2V0Q29ycmVjdEhvdXIodG9Db3JyZWN0KTtcblxuICAgIGNvbnN0IGhvdXJseVdlYXRoZXJDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2VhdGhlci1jb250YWluZXInKTtcblxuICAgIGNvbnN0IGN1cnJIb3VyRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY3VyckhvdXJFbC50ZXh0Q29udGVudCA9IGhvdXJUb0Rpc3BsYXk7XG4gICAgY3VyckhvdXJFbC5zdHlsZS5wYWRkaW5nID0gJzAuNXJlbSc7XG5cbiAgICBob3VybHlXZWF0aGVyQ29udGFpbmVyLmFwcGVuZChjdXJySG91ckVsKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGRpc3BsYXlIb3VybHlXZWF0aGVyLFxuICB9O1xufSkoKTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgQVBJX0tFWSwgQVBJX1VSTCB9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7IGhvdXJWaWV3IH0gZnJvbSAnLi92aWV3cy9ob3VyVmlldyc7XG5cbmxldCBxdWVyeTtcblxuY29uc3QgZ2V0Q2l0eVVSTCA9IGZ1bmN0aW9uIChjaXR5KSB7XG4gIHJldHVybiBgJHtBUElfVVJMfS93ZWF0aGVyP3E9JHtjaXR5fSZ1bml0cz1tZXRyaWMmYXBwaWQ9JHtBUElfS0VZfWA7XG59O1xuXG5jb25zdCBnZXRDaXR5RGF0YSA9IGFzeW5jIGZ1bmN0aW9uIChjaXR5KSB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChnZXRDaXR5VVJMKGNpdHkpKTtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ2dldGRhdGEnLCBlcnIubWVzc2FnZSk7XG4gIH1cbn07XG5cbmNvbnN0IGdldENvb3JkcyA9IGFzeW5jIGZ1bmN0aW9uIChkYXRhKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgY2l0eSA9IGF3YWl0IGRhdGE7XG4gICAgY29uc3QgbGF0ID0gK2NpdHkuY29vcmQubGF0LnRvRml4ZWQoMik7XG4gICAgY29uc3QgbG9uZyA9ICtjaXR5LmNvb3JkLmxvbi50b0ZpeGVkKDIpO1xuXG4gICAgcmV0dXJuIFtsYXQsIGxvbmddO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmVycm9yKCdjb29yZHMnLCBlcnIubWVzc2FnZSk7XG4gIH1cbn07XG5cbmNvbnN0IGdldFdlYXRoZXJVUkwgPSBhc3luYyBmdW5jdGlvbiAoZGF0YSkge1xuICB0cnkge1xuICAgIGNvbnN0IGNvb3JkcyA9IGF3YWl0IGRhdGE7XG5cbiAgICBjb25zdCBbbGF0LCBsb25nXSA9IGNvb3JkcztcblxuICAgIHJldHVybiBgJHtBUElfVVJMfS9vbmVjYWxsP2xhdD0ke2xhdH0mbG9uPSR7bG9uZ30mdW5pdHM9bWV0cmljJmV4Y2x1ZGU9bWludXRlbHkmYXBwaWQ9JHtBUElfS0VZfWA7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ3dlYXRoZXJ1cmwnLCBlcnIubWVzc2FnZSk7XG4gIH1cbn07XG5cbmNvbnN0IGdldFdlYXRoZXIgPSBhc3luYyBmdW5jdGlvbiAoY2l0eSkge1xuICB0cnkge1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBnZXRDaXR5RGF0YShjaXR5KTtcbiAgICBjb25zdCBjb29yZHMgPSBhd2FpdCBnZXRDb29yZHMoZGF0YSk7XG4gICAgY29uc3QgdXJsID0gYXdhaXQgZ2V0V2VhdGhlclVSTChjb29yZHMpO1xuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwpO1xuICAgIGNvbnN0IHdlYXRoZXIgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cbiAgICByZXR1cm4gd2VhdGhlcjtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcihlcnIubWVzc2FnZSk7XG4gIH1cbn07XG5cbmNvbnN0IG1hbmlsYUxvYyA9IGdldFdlYXRoZXIoJ01hbmlsYScpO1xuXG5jb25zdCBnZXRIb3VybHlXZWF0aGVyID0gYXN5bmMgZnVuY3Rpb24gKGxvY2F0aW9uT2JqKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgbG9jYXRpb24gPSBhd2FpdCBsb2NhdGlvbk9iajtcbiAgICBjb25zdCB3ZWF0aGVyNDhIcnMgPSBsb2NhdGlvbi5ob3VybHk7XG4gICAgY29uc3Qgd2VhdGhlcjI0SHJzID0gd2VhdGhlcjQ4SHJzLnNsaWNlKDAsIDI0KTtcblxuICAgIHJldHVybiB3ZWF0aGVyMjRIcnM7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ2dldGhvdXJseXdlYXRoZXInLCBlcnIubWVzc2FnZSk7XG4gIH1cbn07XG5cbmNvbnN0IHNhbXBsZURhdGEgPSBnZXRIb3VybHlXZWF0aGVyKG1hbmlsYUxvYyk7XG5cbmhvdXJWaWV3LmRpc3BsYXlIb3VybHlXZWF0aGVyKHNhbXBsZURhdGEpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
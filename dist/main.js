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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBTzs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZBO0FBQ1A7QUFDQTtBQUNBOztBQUVPO0FBQ1A7O0FBRUE7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ1g0Qzs7QUFFckM7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQix3REFBYzs7QUFFeEM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7OztVQzVCRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ040QztBQUNBOztBQUU1Qzs7QUFFQTtBQUNBLFlBQVksNENBQU8sQ0FBQyxhQUFhLEtBQUssc0JBQXNCLDRDQUFPLENBQUM7QUFDcEU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxjQUFjLDRDQUFPLENBQUMsZUFBZSxJQUFJLE9BQU8sS0FBSyx1Q0FBdUMsNENBQU8sQ0FBQztBQUNwRyxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsMEVBQTZCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9wLXdlYXRoZXItYXBwLy4vc3JjL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly90b3Atd2VhdGhlci1hcHAvLi9zcmMvaGVscGVycy5qcyIsIndlYnBhY2s6Ly90b3Atd2VhdGhlci1hcHAvLi9zcmMvdmlld3MvaG91clZpZXcuanMiLCJ3ZWJwYWNrOi8vdG9wLXdlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvcC13ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9wLXdlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9wLXdlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9wLXdlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBBUElfS0VZID0gYDlmNWEwYTk1NzFmODYwMDAwNTQxMTlkNjVjMGQ0Zjg2YDtcblxuZXhwb3J0IGNvbnN0IEFQSV9VUkwgPSBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41YDtcbiIsImV4cG9ydCBjb25zdCBwYWRTdGFydEhvdXIgPSBmdW5jdGlvbiAoaG91cikge1xuICBjb25zdCB0b1BhZCA9IGhvdXIgKyAnJztcbiAgcmV0dXJuIHRvUGFkLnBhZFN0YXJ0KDIsICcwJyk7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0Q29ycmVjdEhvdXIgPSBmdW5jdGlvbiAoaG91cikge1xuICBjb25zdCB0b1BhZCA9ICtob3VyIDwgMjQgPyBob3VyIDogK2hvdXIgLSAyNDtcblxuICBjb25zdCBob3VyUGFkZGVkID0gcGFkU3RhcnRIb3VyKHRvUGFkKTtcblxuICByZXR1cm4gaG91clBhZGRlZDtcbn07XG4iLCJpbXBvcnQgeyBnZXRDb3JyZWN0SG91ciB9IGZyb20gJy4uL2hlbHBlcnMnO1xuXG5leHBvcnQgY29uc3QgaG91clZpZXcgPSAoZnVuY3Rpb24gKCkge1xuICBjb25zdCBkaXNwbGF5SG91cmx5V2VhdGhlciA9IGFzeW5jIGZ1bmN0aW9uICh3ZWF0aGVyKSB7XG4gICAgY29uc3QgaG91cmx5V2VhdGhlciA9IGF3YWl0IHdlYXRoZXI7XG4gICAgaG91cmx5V2VhdGhlci5mb3JFYWNoKChob3VyLCBpKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhob3VyKTtcbiAgICAgIF9jcmVhdGVXZWF0aGVyRGl2KGkpO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IF9jcmVhdGVXZWF0aGVyRGl2ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgdG9Db3JyZWN0ID0gK2RhdGUuZ2V0SG91cnMoKSArICtpbmRleDtcbiAgICBjb25zdCBob3VyVG9EaXNwbGF5ID0gZ2V0Q29ycmVjdEhvdXIodG9Db3JyZWN0KTtcblxuICAgIGNvbnN0IGZvcmVjYXN0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcmVjYXN0LWNvbnRhaW5lcicpO1xuXG4gICAgY29uc3QgY3VyckhvdXJFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBjdXJySG91ckVsLnRleHRDb250ZW50ID0gaG91clRvRGlzcGxheTtcbiAgICBjdXJySG91ckVsLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0Jyk7XG5cbiAgICBmb3JlY2FzdENvbnRhaW5lci5hcHBlbmQoY3VyckhvdXJFbCk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBkaXNwbGF5SG91cmx5V2VhdGhlcixcbiAgfTtcbn0pKCk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IEFQSV9LRVksIEFQSV9VUkwgfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgeyBob3VyVmlldyB9IGZyb20gJy4vdmlld3MvaG91clZpZXcnO1xuXG5sZXQgcXVlcnk7XG5cbmNvbnN0IGdldENpdHlVUkwgPSBmdW5jdGlvbiAoY2l0eSkge1xuICByZXR1cm4gYCR7QVBJX1VSTH0vd2VhdGhlcj9xPSR7Y2l0eX0mdW5pdHM9bWV0cmljJmFwcGlkPSR7QVBJX0tFWX1gO1xufTtcblxuY29uc3QgZ2V0Q2l0eURhdGEgPSBhc3luYyBmdW5jdGlvbiAoY2l0eSkge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goZ2V0Q2l0eVVSTChjaXR5KSk7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblxuICAgIHJldHVybiBkYXRhO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmVycm9yKCdnZXRkYXRhJywgZXJyLm1lc3NhZ2UpO1xuICB9XG59O1xuXG5jb25zdCBnZXRDb29yZHMgPSBhc3luYyBmdW5jdGlvbiAoZGF0YSkge1xuICB0cnkge1xuICAgIGNvbnN0IGNpdHkgPSBhd2FpdCBkYXRhO1xuICAgIGNvbnN0IGxhdCA9ICtjaXR5LmNvb3JkLmxhdC50b0ZpeGVkKDIpO1xuICAgIGNvbnN0IGxvbmcgPSArY2l0eS5jb29yZC5sb24udG9GaXhlZCgyKTtcblxuICAgIHJldHVybiBbbGF0LCBsb25nXTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcignY29vcmRzJywgZXJyLm1lc3NhZ2UpO1xuICB9XG59O1xuXG5jb25zdCBnZXRXZWF0aGVyVVJMID0gYXN5bmMgZnVuY3Rpb24gKGRhdGEpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBjb29yZHMgPSBhd2FpdCBkYXRhO1xuXG4gICAgY29uc3QgW2xhdCwgbG9uZ10gPSBjb29yZHM7XG5cbiAgICByZXR1cm4gYCR7QVBJX1VSTH0vb25lY2FsbD9sYXQ9JHtsYXR9Jmxvbj0ke2xvbmd9JnVuaXRzPW1ldHJpYyZleGNsdWRlPW1pbnV0ZWx5JmFwcGlkPSR7QVBJX0tFWX1gO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmVycm9yKCd3ZWF0aGVydXJsJywgZXJyLm1lc3NhZ2UpO1xuICB9XG59O1xuXG5jb25zdCBnZXRXZWF0aGVyID0gYXN5bmMgZnVuY3Rpb24gKGNpdHkpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgZ2V0Q2l0eURhdGEoY2l0eSk7XG4gICAgY29uc3QgY29vcmRzID0gYXdhaXQgZ2V0Q29vcmRzKGRhdGEpO1xuICAgIGNvbnN0IHVybCA9IGF3YWl0IGdldFdlYXRoZXJVUkwoY29vcmRzKTtcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsKTtcbiAgICBjb25zdCB3ZWF0aGVyID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXG4gICAgcmV0dXJuIHdlYXRoZXI7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyLm1lc3NhZ2UpO1xuICB9XG59O1xuXG5jb25zdCBtYW5pbGFMb2MgPSBnZXRXZWF0aGVyKCdNYW5pbGEnKTtcblxuY29uc3QgZ2V0SG91cmx5V2VhdGhlciA9IGFzeW5jIGZ1bmN0aW9uIChsb2NhdGlvbk9iaikge1xuICB0cnkge1xuICAgIGNvbnN0IGxvY2F0aW9uID0gYXdhaXQgbG9jYXRpb25PYmo7XG4gICAgY29uc3Qgd2VhdGhlcjQ4SHJzID0gbG9jYXRpb24uaG91cmx5O1xuICAgIGNvbnN0IHdlYXRoZXIyNEhycyA9IHdlYXRoZXI0OEhycy5zbGljZSgwLCAyNCk7XG5cbiAgICByZXR1cm4gd2VhdGhlcjI0SHJzO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmVycm9yKCdnZXRob3VybHl3ZWF0aGVyJywgZXJyLm1lc3NhZ2UpO1xuICB9XG59O1xuXG5jb25zdCBzYW1wbGVEYXRhID0gZ2V0SG91cmx5V2VhdGhlcihtYW5pbGFMb2MpO1xuXG5ob3VyVmlldy5kaXNwbGF5SG91cmx5V2VhdGhlcihzYW1wbGVEYXRhKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
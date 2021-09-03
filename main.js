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

getHourlyWeather(manilaLoc);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBTzs7QUFFQTs7Ozs7OztVQ0ZQO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNONEM7O0FBRTVDOztBQUVBO0FBQ0EsWUFBWSw0Q0FBTyxDQUFDLGFBQWEsS0FBSyxzQkFBc0IsNENBQU8sQ0FBQztBQUNwRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLGNBQWMsNENBQU8sQ0FBQyxlQUFlLElBQUksT0FBTyxLQUFLLHVDQUF1Qyw0Q0FBTyxDQUFDO0FBQ3BHLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvcC13ZWF0aGVyLWFwcC8uL3NyYy9jb25maWcuanMiLCJ3ZWJwYWNrOi8vdG9wLXdlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvcC13ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9wLXdlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9wLXdlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9wLXdlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBBUElfS0VZID0gYDlmNWEwYTk1NzFmODYwMDAwNTQxMTlkNjVjMGQ0Zjg2YDtcblxuZXhwb3J0IGNvbnN0IEFQSV9VUkwgPSBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41YDtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgQVBJX0tFWSwgQVBJX1VSTCB9IGZyb20gJy4vY29uZmlnJztcblxubGV0IHF1ZXJ5O1xuXG5jb25zdCBnZXRDaXR5VVJMID0gZnVuY3Rpb24gKGNpdHkpIHtcbiAgcmV0dXJuIGAke0FQSV9VUkx9L3dlYXRoZXI/cT0ke2NpdHl9JnVuaXRzPW1ldHJpYyZhcHBpZD0ke0FQSV9LRVl9YDtcbn07XG5cbmNvbnN0IGdldENpdHlEYXRhID0gYXN5bmMgZnVuY3Rpb24gKGNpdHkpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGdldENpdHlVUkwoY2l0eSkpO1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcignZ2V0ZGF0YScsIGVyci5tZXNzYWdlKTtcbiAgfVxufTtcblxuY29uc3QgZ2V0Q29vcmRzID0gYXN5bmMgZnVuY3Rpb24gKGRhdGEpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBjaXR5ID0gYXdhaXQgZGF0YTtcbiAgICBjb25zdCBsYXQgPSArY2l0eS5jb29yZC5sYXQudG9GaXhlZCgyKTtcbiAgICBjb25zdCBsb25nID0gK2NpdHkuY29vcmQubG9uLnRvRml4ZWQoMik7XG5cbiAgICByZXR1cm4gW2xhdCwgbG9uZ107XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ2Nvb3JkcycsIGVyci5tZXNzYWdlKTtcbiAgfVxufTtcblxuY29uc3QgZ2V0V2VhdGhlclVSTCA9IGFzeW5jIGZ1bmN0aW9uIChkYXRhKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgY29vcmRzID0gYXdhaXQgZGF0YTtcblxuICAgIGNvbnN0IFtsYXQsIGxvbmddID0gY29vcmRzO1xuXG4gICAgcmV0dXJuIGAke0FQSV9VUkx9L29uZWNhbGw/bGF0PSR7bGF0fSZsb249JHtsb25nfSZ1bml0cz1tZXRyaWMmZXhjbHVkZT1taW51dGVseSZhcHBpZD0ke0FQSV9LRVl9YDtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcignd2VhdGhlcnVybCcsIGVyci5tZXNzYWdlKTtcbiAgfVxufTtcblxuY29uc3QgZ2V0V2VhdGhlciA9IGFzeW5jIGZ1bmN0aW9uIChjaXR5KSB7XG4gIHRyeSB7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IGdldENpdHlEYXRhKGNpdHkpO1xuICAgIGNvbnN0IGNvb3JkcyA9IGF3YWl0IGdldENvb3JkcyhkYXRhKTtcbiAgICBjb25zdCB1cmwgPSBhd2FpdCBnZXRXZWF0aGVyVVJMKGNvb3Jkcyk7XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCk7XG4gICAgY29uc3Qgd2VhdGhlciA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblxuICAgIHJldHVybiB3ZWF0aGVyO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmVycm9yKGVyci5tZXNzYWdlKTtcbiAgfVxufTtcblxuY29uc3QgbWFuaWxhTG9jID0gZ2V0V2VhdGhlcignTWFuaWxhJyk7XG5cbmNvbnN0IGdldEhvdXJseVdlYXRoZXIgPSBhc3luYyBmdW5jdGlvbiAobG9jYXRpb25PYmopIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBsb2NhdGlvbiA9IGF3YWl0IGxvY2F0aW9uT2JqO1xuICAgIGNvbnN0IHdlYXRoZXI0OEhycyA9IGxvY2F0aW9uLmhvdXJseTtcbiAgICBjb25zdCB3ZWF0aGVyMjRIcnMgPSB3ZWF0aGVyNDhIcnMuc2xpY2UoMCwgMjQpO1xuXG4gICAgcmV0dXJuIHdlYXRoZXIyNEhycztcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcignZ2V0aG91cmx5d2VhdGhlcicsIGVyci5tZXNzYWdlKTtcbiAgfVxufTtcblxuZ2V0SG91cmx5V2VhdGhlcihtYW5pbGFMb2MpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
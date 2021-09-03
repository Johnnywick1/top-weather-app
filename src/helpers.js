export const API_KEY = `9f5a0a9571f86000054119d65c0d4f86`;

export const getURL = function (city) {
  return `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
};

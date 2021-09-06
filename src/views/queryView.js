export const queryView = (function () {
  const form = document.querySelector('.weather-form');
  const queryEl = document.querySelector('.weather-query');

  const addHandlerGetQuery = function (handler) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const query = queryEl.value;

      handler(query);

      queryEl.value = '';
    });
  };

  return {
    addHandlerGetQuery,
  };
})();

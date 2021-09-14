export const queryView = (function () {
  const addHandlerGetQuery = function (handler) {
    const form = document.querySelector('.weather-form');
    const queryEl = document.querySelector('.weather-query');

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

import View from './View';

const SearchView = (() => {
  const container = document.querySelector('.search-bar--wrapper');
  const searchBar = document.querySelector('input[type="search"]');
  const searchBtn = document.querySelector('.btn-search');
  const searchResults = document.querySelector('.search-results');

  const addHandlerLoadSearchResults = (handler) => {
    // Enter key event
    searchBar.addEventListener('keyup', (e) => {
      if (e.key !== 'Enter') return;

      handler(searchBar.value);
    });

    // Btn click event
    searchBtn.addEventListener('click', () => {
      handler(searchBar.value);
    });

    // Hide results on focus out
    container.addEventListener('blur', () => {
      View.clearEl(searchResults);
      View.hideEl(searchResults);
    });
  };

  const addHandlerToEachResult = (handler) => {
    const results = [...searchResults.querySelectorAll('.search-result')];

    results.forEach((res) =>
      res.addEventListener('click', () => {
        const { latitude, longitude } = res.dataset;

        handler(+latitude, +longitude);

        View.clearEl(searchResults);
        View.hideEl(searchResults);
      }),
    );
    results.forEach((res) =>
      res.addEventListener('keyup', (e) => {
        if (e.key !== 'Enter') return;
        const { latitude, longitude } = res.dataset;

        handler(+latitude, +longitude);

        View.clearEl(searchResults);
        View.hideEl(searchResults);
      }),
    );
  };

  const renderSearchResults = (data) => {
    const container = document.querySelector('.search-results');

    if (!data || !data.length) {
      container.insertAdjacentHTML(
        'afterbegin',
        `<div class="search-result">No search results available</div>`,
      );
      View.unhideEl(container);
      return;
    }

    const markup = data
      .map(
        (city) => `
        <div class="search-result" data-latitude="${city.latitude}" data-longitude="${city.longitude}">${city.name}, ${city.region}, ${city.country}</div>
        `,
      )
      .join('');

    container.insertAdjacentHTML('afterbegin', markup);
    View.unhideEl(container);
  };

  return {
    addHandlerLoadSearchResults,
    addHandlerToEachResult,
    renderSearchResults,
  };
})();

export default SearchView;

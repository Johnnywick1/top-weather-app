import { debounce } from 'lodash';
import View from './View';

const SearchView = (() => {
  const container = document.querySelector('.search-bar--wrapper');
  const searchBar = document.querySelector('input[type="search"]');
  const searchBtn = document.querySelector('.btn-search');
  const searchResults = document.querySelector('.search-results');

  const addHandlerLoadSearchResults = (handler) => {
    // Enter key event
    searchBar.addEventListener(
      'keyup',
      debounce((e) => {
        if (e.key === 'Escape') return;

        View.clearEl(searchResults);
        View.hideEl(searchResults);
        handler(searchBar.value);
      }, 400),
    );

    // Btn click event
    searchBtn.addEventListener('click', () => {
      View.clearEl(searchResults);
      View.hideEl(searchResults);
      handler(searchBar.value);
    });

    // Hide results on focus out
    container.addEventListener('focusout', () => {
      View.clearEl(searchResults);
      View.hideEl(searchResults);
    });

    // Hide results on escape keypress
    container.addEventListener('keyup', (e) => {
      if (e.key !== 'Escape') return;

      View.clearEl(searchResults);
      View.hideEl(searchResults);
    });
  };

  const addHandlerToEachResult = (handler) => {
    const results = [...searchResults.querySelectorAll('.search-result')];

    results.forEach((res) =>
      res.addEventListener('mousedown', () => {
        const { latitude, longitude } = res.dataset;

        handler(+latitude, +longitude);

        View.clearEl(searchResults);
        View.hideEl(searchResults);
      }),
    );
  };

  const renderSearchResults = (data) => {
    if (!data || !data.length) {
      searchResults.insertAdjacentHTML(
        'afterbegin',
        `<div style="padding:10px;">No search results available</div>`,
      );
      View.unhideEl(searchResults);
      return;
    }

    const markup = data
      .map(
        (city) => `
        <div class="search-result" data-latitude="${city.latitude}" data-longitude="${city.longitude}" tabIndex="0">${city.name}, ${city.region}, ${city.country}</div>
        `,
      )
      .join('');

    searchResults.insertAdjacentHTML('afterbegin', markup);
    View.unhideEl(searchResults);
  };

  return {
    addHandlerLoadSearchResults,
    addHandlerToEachResult,
    renderSearchResults,
  };
})();

export default SearchView;

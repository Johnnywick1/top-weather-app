const View = (() => {
  const unhideEl = (el) => {
    el.classList.remove('hidden');
  };

  const hideEl = (el) => {
    el.classList.add('hidden');
  };

  const clearEl = (el) => {
    el.innerHTML = ``;
  };

  return {
    unhideEl,
    hideEl,
    clearEl,
  };
})();

export default View;

import View from './View';
import icons from 'url:../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandelerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // page 1 with more pages
    if (currPage === 1 && numPages > 1) {
      return `
          <button data-goto ="${
            currPage + 1
          }" class="btn--inline pagination__btn--next">
            <span>Page  ${currPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }
    // last page
    if (currPage === numPages && numPages > 1) {
      return `
          <button data-goto ="${
            currPage - 1
          }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currPage - 1}</span>
          </button>`;
    }
    // middle page
    if (currPage < numPages) {
      return `
          <button data-goto ="${
            currPage - 1
          }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currPage - 1}</span>
          </button>
          <button data-goto ="${
            currPage + 1
          }" class="btn--inline pagination__btn--next">
            <span>Page  ${currPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }
    // page 1 with no more pages
    return ``;
  }
}

export default new PaginationView();

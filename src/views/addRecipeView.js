import View from './View';
import icons from 'url:../img/icons.svg';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _message = 'Recipe was uploaded successfully!';

  constructor() {
    super();
    this._addHandelerShowWindow();
    this._addHandelerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandelerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandelerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandelerUpload(handeler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArray = [...new FormData(this)];
      const data = Object.fromEntries(dataArray);
      handeler(data);
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeView();

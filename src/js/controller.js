import * as model from './model.js';
import recipeView from '../views/recipeView.js';
import searchView from '../views/searchView.js';
import resultsView from '../views/resultsView.js';
import paginationView from '../views/paginationView.js';
import bookmarkView from '../views/bookmarkView.js';
import addRecipeView from '../views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  const recipeContainer = document.querySelector('.recipe');
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);
    if (!id) return;

    //result view update to highlight selected recipe
    resultsView.update(model.getSearchResultsPage());

    recipeView.renderSpinner();

    //loading recipe
    await model.loadRecipe(id);

    //rendering recipe
    recipeView.render(model.state.recipe);

    // update bookmark view
    bookmarkView.update(model.state.bookmarks);
  } catch (error) {
    recipeView.renderError(error);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // get search query
    const query = searchView.getQuery();
    if (!query) return;

    // load search results
    await model.loadSearchResults(query);

    // render results
    resultsView.render(model.getSearchResultsPage());

    // render initial pagination
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};

const controlPagination = function (goToPage) {
  // render new results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // render new pagination
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // update servings in state
  model.updateServings(newServings);
  // update servings in view
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // add or remove bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else if (model.state.recipe.bookmarked) {
    model.deleteBookmark(model.state.recipe.id);
  }
  // update recipe view
  recipeView.update(model.state.recipe);

  // render bookmarks tab
  bookmarkView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // render load spinner
    addRecipeView.renderSpinner();

    // upload new user recipe
    await model.uploadRecipe(newRecipe);

    // reder user recipe
    recipeView.render(model.state.recipe);

    // display success message
    addRecipeView.renderMessage();

    // redner bookmarks
    bookmarkView.render(model.state.bookmarks);

    // change URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (error) {
    console.error(error);
    addRecipeView.renderError(error.message);
  }
};

const init = function () {
  bookmarkView.addHandelerRender(controlBookmarks);
  recipeView.addHandelerRender(controlRecipes);
  recipeView.addHandelerUpdateServings(controlServings);
  recipeView.addHandelerAddBookmark(controlAddBookmark);
  searchView.addHandelerSearch(controlSearchResults);
  paginationView.addHandelerClick(controlPagination);
  addRecipeView._addHandelerUpload(controlAddRecipe);
};

init();

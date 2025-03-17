import * as model from './model.js';
import recipeView from '../views/recipeView.js';
import searchView from '../views/searchView.js';
import resultsView from '../views/resultsView.js';
import paginationView from '../views/paginationView.js';
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

const init = function () {
  recipeView.addHandelerRender(controlRecipes);
  recipeView.addHandelerUpdateServings(controlServings);
  searchView.addHandelerSearch(controlSearchResults);
  paginationView.addHandelerClick(controlPagination);
};

init();

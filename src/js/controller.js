import * as model from './model.js';
import recipeView from '../views/recipeView.js';
import searchView from '../views/searchView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const controlRecipes = async function () {
  const recipeContainer = document.querySelector('.recipe');
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);
    if (!id) return;

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
    // get search query
    const query = searchView.getQuery();
    if (!query) return;

    // load search results
    await model.loadSearchResults(query);

    // render results
  } catch (error) {
    console.log(error);
  }
};

const init = function () {
  recipeView.addHandelerRender(controlRecipes);
  searchView.addHandelerSearch(controlSearchResults);
};

init();

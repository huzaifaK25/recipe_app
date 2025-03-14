import * as model from './model.js';
import recipeView from '../views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

///////////////////////////////////////

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

const controlRecipes = async function () {
  const recipeContainer = document.querySelector('.recipe');
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    //loading recipe
    await model.loadRecipe(id);

    //rendering recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    alert(error);
  }
};
controlRecipes();
// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);
// ['hashchange', 'load'].forEach(ev => {
//   window.addEventListener(ev, showRecipe);
// });

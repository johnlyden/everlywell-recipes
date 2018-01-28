import axios from 'axios';

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const REQUEST_RECIPES = 'REQUEST_RECIPES';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
export const LOAD_FAVORITES = 'LOAD_FAVORITES';

// this API does not have CORS enabled
// proxyURL is open CORS proxy that just adds the Access-Control-Allow-Origin response header so that browsers will allow your frontend JavaScript code to access the response.
const proxyURL = "https://cors-anywhere.herokuapp.com/";
const ROOT_SEARCH_URL = 'http://www.themealdb.com/api/json/v1/1/search.php?s=';
const ROOT_LATEST_URL = 'http://www.themealdb.com/api/json/v1/1/latest.php';


export function openModal(selectedRecipe) {
  return {
    type: OPEN_MODAL,
    payload: selectedRecipe
  }
}

export function closeModal() {
  return {
    type: CLOSE_MODAL
  }
}

export function requestRecipes(term = null) {
  let url;
  if (term !== null && term !== "" && term !== 'undefined') {
    let searchTerm = ''
    term.split(" ").forEach((word) => {
      searchTerm += `+${word}`
    });
    url = `${proxyURL}${ROOT_SEARCH_URL}${searchTerm}`;
  } else {
    url = `${proxyURL}${ROOT_LATEST_URL}`;
  }

  const request = axios.get(url).catch((err) => {
		console.log('error with the request ', err);
  });
  
  return {
      type: REQUEST_RECIPES,
      payload: request
  }
}

export function addToFavorites(recipe) {
  return {
    type: ADD_FAVORITE,
    payload: recipe
  }
}

export function removeFromFavorites(recipe) {
  return {
    type: REMOVE_FAVORITE,
    payload: recipe
  }
}

export function loadFavoriteRecipes(recipes) {
  return {
    type: LOAD_FAVORITES,
    payload: recipes
  }
}
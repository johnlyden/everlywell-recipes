export const REQUEST_RECIPES = 'REQUEST_RECIPES';


// this API does not have CORS enabled
// proxyURL is open CORS proxy that just adds the Access-Control-Allow-Origin response header so that browsers will allow your frontend JavaScript code to access the response.
const proxyURL = "https://cors-anywhere.herokuapp.com/";
const ROOT_SEARCH_URL = 'http://www.themealdb.com/api/json/v1/1/search.php?s=';
const ROOT_LATEST_URL = 'http://www.themealdb.com/api/json/v1/1/latest.php';

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
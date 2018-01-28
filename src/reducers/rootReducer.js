import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  recipes: RecipesReducer
});

export default rootReducer;
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  modal: ModalReducer,
  recipes: RecipesReducer
});

export default rootReducer;
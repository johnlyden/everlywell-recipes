import { combineReducers } from 'redux';
import ModalReducer from './modal_reducer';
import RecipesReducer from './recipes_reducer';
import FavoritesReducer from './favorites_reducer';

const rootReducer = combineReducers({
  modal: ModalReducer,
  recipes: RecipesReducer,
  favorites: FavoritesReducer
});

export default rootReducer;
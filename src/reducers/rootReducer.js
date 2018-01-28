import { combineReducers } from 'redux';
import ModalReducer from './modal';
import RecipesReducer from './recipes';
import FavoritesReducer from './favorites_reducer';

const rootReducer = combineReducers({
  modal: ModalReducer,
  recipes: RecipesReducer,
  favorites: FavoritesReducer
});

export default rootReducer;
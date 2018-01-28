import { ADD_FAVORITE, REMOVE_FAVORITE, LOAD_FAVORITES } from '../actions';

const initialState = [];

export default function recipe(state = initialState, action){
	switch(action.type) {
    case ADD_FAVORITE:
      return [
        ...state,
        action.payload
      ]
    case REMOVE_FAVORITE:
      return state.filter(element => element.idMeal !== action.payload.idMeal); 
    case LOAD_FAVORITES:
      return action.payload
    default:
      return state;
  }
}
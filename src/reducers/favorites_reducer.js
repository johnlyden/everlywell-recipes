import { ADD_FAVORITE, REMOVE_FAVORITE } from '../actions';

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
    default:
      return state;
  }
}
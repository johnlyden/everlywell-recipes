import { REQUEST_RECIPES, LOAD_FAVORITES } from '../actions';

const initialState = [];

export default function recipes(state = initialState, action){
  switch(action.type) {
		case REQUEST_RECIPES:
      return action.payload.data.meals || [];
    case LOAD_FAVORITES:
      return action.payload;
		default:
			return state;
	}
}
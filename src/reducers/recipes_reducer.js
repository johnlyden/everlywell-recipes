import { REQUEST_RECIPES, SHOW_FAVORITES } from '../actions';

const initialState = [];

export default function recipes(state = initialState, action){
  switch(action.type) {
		case REQUEST_RECIPES:
      return action.payload.data.meals || [];
    case SHOW_FAVORITES:
      return action.payload;
		default:
			return state;
	}
}
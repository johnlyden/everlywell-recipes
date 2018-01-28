import { REQUEST_RECIPES } from '../actions';

const initialState = [];

export default function recipes(state = initialState, action){
  switch(action.type) {
		case REQUEST_RECIPES:
			return action.payload.data.meals || [];
		default:
			return state;
	}
}
import { OPEN_MODAL, CLOSE_MODAL } from '../actions';

const initialState = {
	modalIsOpen: false
};

export default function modal(state = initialState, action){
	switch(action.type) {
		case OPEN_MODAL:
			return {
					...state,
          modalIsOpen: true,
          selectedRecipe: action.payload.selectedRecipe

      };
    case CLOSE_MODAL:
			return {
				...state,
				modalIsOpen: false,
				selectedRecipe: null
			};
		default:
			return state;
	}
}
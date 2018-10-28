import { actionTypes } from '../actions';

export const pendingReducer = (state = {error: false, load: false}, action) => {
	const setFields = {
		error: false,
		load: true,
	},
		clearFields = {
			error: false,
			load: false,
		}
	switch (action.type) {
		case actionTypes.SET_PENDINGS:
			return {
				...state,
				...setFields,
				pendings: action.pendings,
			}
		case actionTypes.CLEAR_PENDINGS:
			return {
				...state,
				...clearFields,
				pendings: [],
            }
        case actionTypes.CLEAR_PENDING:
			return {
				...state,
				...clearFields,
				selectedPending: null,
			}
		case actionTypes.PENDINGS_GETTING_FAILURE:
			return {
				...state,
				error: true,
				load: true,
				message: action.message,
            }
        case actionTypes.SELECT_PENDING: 
            return {
                ...state,
                selectedPending: action.pending,
                error: false,
            }
		default:
			return state;
	}
};
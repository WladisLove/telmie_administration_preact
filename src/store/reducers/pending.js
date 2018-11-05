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
				withdrawals: [],
            }
		case actionTypes.PENDINGS_GETTING_FAILURE:
		case actionTypes.GET_WITHDRAWALS_FAILURE:
			return {
				...state,
				error: true,
				load: true,
				message: action.message,
				pendings: [],
				withdrawals: [],
			}
		case actionTypes.SET_WITHDRAWALS:
			return {
				...state,
				...setFields,
				withdrawals: action.withdrawals,
			}
		default:
			return state;
	}
};

export const activateUser = (state = {error: false, isComplete: true}, action) => {
	
	switch (action.type) {
		case actionTypes.START_ACTIVATE_USER:
			return {
				...state,
				error: false,
				isComplete: false,
				isSuccess: false,
				message: '',
			}
		case actionTypes.ACTIVATE_USER_SUCCESS:
			return {
				...state,
				error: false,
				isComplete: true,
				isSuccess: true,
				message: 'Approved',
			}
		case actionTypes.ACTIVATE_USER_FAILURE:
			return {
				...state,
				error: true,
				isComplete: true,
				isSuccess: false,
				message: action.message,
			}
		case actionTypes.CLEAR_ACTIVATE_USER_STATUS:
			return {
				...state,
				error: false,
				isComplete: true,
				isSuccess: false,
				message: '',
			}
		default:
			return state;
	}
};
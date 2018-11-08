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
		case actionTypes.SELECT_PENDING:
			return {
				...state,
				isPendingSelected: true,
			}
		case actionTypes.UNSELECT_PENDING:
			return {
				...state,
				isPendingSelected: false,
     }
		case actionTypes.PENDINGS_GETTING_FAILURE:
		case actionTypes.GET_WITHDRAWALS_FAILURE:
			return {
				...state,
				error: true,
				load: true,
				message: `${action.message} (error in getting list of requests)`,
				pendings: [],
				withdrawals: [],
			}
		case actionTypes.WITHDRAWAL_MANIPULATE_START:
			return {
				...state,
				error: false,
				load: false,
				message: ``,
			}
		case actionTypes.WITHDRAWAL_MANIPULATE_SUCCESS:
			return {
				...state,
				error: false,
				load: true,
				message: `${action.manipulation} successfully`,
			}
		case actionTypes.WITHDRAWAL_MANIPULATE_FAILURE:
			return {
				...state,
				error: true,
				load: true,
				message: `${action.message} (not ${action.manipulation})`,
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
		case actionTypes.START_PROCESSING_PENDING:
			return {
				...state,
				error: false,
				isComplete: false,
				isSuccess: false,
				message: '',
			}
		case actionTypes.PROCESSING_PENDING_SUCCESS:
			return {
				...state,
				error: false,
				isComplete: true,
				isSuccess: true,
				message: action.message,
			}
		case actionTypes.PROCESSING_PENDING_FAILURE:
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
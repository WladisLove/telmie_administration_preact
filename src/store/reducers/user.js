import { actionTypes } from '../actions';


export const loggedInUser = (state = {}, action) => {
	let user;
	switch (action.type) {
		case actionTypes.LOG_IN_SUCCESS:
			user = action.userData;
			user.userAuth = action.userAuth;
			return user;

		case actionTypes.LOGGED_OFF:
			return {};

		default:
			return state;
	}
};

export const logInError = (state = {}, action) => {
	switch (action.type) {
		case actionTypes.LOG_IN_FAILURE:
			let date = new Date();
			return date.getTime();

		default:
			return false;
	}
};

export const usersArrays = (state = {error: false, load: false}, action) => {
	const setFields = {
		error: false,
		load: true,
	},
		clearFields = {
			error: false,
			load: false,
		}
	switch (action.type) {
		case actionTypes.SET_ACTIVE_USERS:
			let totalMesSent = action.arr.reduce((prevVal, el) => prevVal + el.totalTextOutgoing, 0);

			return {
				...state,
				...setFields,
				totalMesSent,
				activeUsers: action.arr,
			}
		case actionTypes.CLEAR_ACTIVE_USERS:
			return {
				...state,
				...clearFields,
				activeUsers: [],
			}
		case actionTypes.SET_ARCHIVED_USERS:
			return {
				...state,
				...setFields,
				archivedUsers: action.arr,
			}
		case actionTypes.CLEAR_ARCHIVED_USERS:
			return {
				...state,
				...clearFields,
				archivedUsers: [],
			}
		case actionTypes.SET_INCOMPLETE_USERS:
			return {
				...state,
				...setFields,
				incomplUsers: action.arr,
			}
		case actionTypes.CLEAR_INCOMPLETE_USERS:
			return {
				...state,
				...clearFields,
				incomplUsers: [],
			}
		case actionTypes.SET_INVITES:
			return {
				...state,
				...setFields,
				invites: action.arr,
			}
		case actionTypes.CLEAR_INVITES:
			return {
				...state,
				...clearFields,
				invites: [],
			}
		case actionTypes.SET_CALLS:
			return {
				...state,
				...setFields,
				calls: action.arr,
			}
		case actionTypes.CLEAR_CALLS:
			return {
				...state,
				...clearFields,
				calls: [],
			}
		case actionTypes.SET_TRANSACTIONS:
			return {
				...state,
				...setFields,
				transactions: action.arr,
			}
		case actionTypes.CLEAR_TRANSACTIONS:
			return {
				...state,
				...clearFields,
				transactions: [],
			}
		case actionTypes.ERROR_GETTING_USERS:
			return {
				...state,
				error: true,
				load: true,
				message: action.message,
			}
		default:
			return state;
	}
};

export const selectedUserReducer = (state = {error: false}, action) => {
	switch (action.type) {	
        case actionTypes.SELECT_USER: 
            return {
                ...state,
                selectedUser: action.user,
				error: false,
				message: '',
			}
		case actionTypes.CLEAR_USER:
			return {
				...state,
				error: false,
				modifyErr: false,
				selectedUser: null,
				message: '',
				modifyMsg: '',
				infoList: [],
				infoType: '',
				credits: {},
			}
		case actionTypes.START_MODIFY_USER:
			return {
				...state,
				modifyErr: false,
				modifyMsg: ``,
				isModifying: true,
				infoList: [],
				infoType: '',
			}
		case actionTypes.EDIT_USER_SUCCESS:
			return {
				...state,
				selectedUser: action.user,
				error: false,
				message: '',
				isModifying: false,
			}
		case actionTypes.MANIPULATE_USER_FAILURE:
			return {
				...state,
				error: true,
				message: `${action.message ? action.message : ''} 
					${action.manipType ? `(${action.manipType} user failure)` : ''}`,
			}
		case actionTypes.CHANGE_A_U_STATUS_SUCCESS:
			return {
				...state,
				selectedUser: action.user,
				isModifying: false,
				modifyMsg: `User status is changed`,
			}
		case actionTypes.MODIFY_USER_FAILURE:
			return {
				...state,
				modifyErr: true,
				modifyMsg: `${action.message ? action.message : ''}`,
				isModifying: false,
			}
		case actionTypes.RESTORE_USER_SUCCESS:
			return {
				...state,
				selectedUser: action.user,
				isModifying: false,
				modifyMsg: `User is restored`,
			}
		case actionTypes.SET_USER_INFO_LIST:
			return {
				...state,
				isModifying: false,
				infoList: action.infoList,
				infoType: action.infoType,
			}
		case actionTypes.ADD_CREDITS_START:
			return {
				...state,
				credits: { isProcessing: true, }
			}
		case actionTypes.ADD_CREDITS_SUCCESS:
			return {
				...state,
				credits: { isProcessing: false, }
			}
		case actionTypes.ADD_CREDITS_FAILURE:
			return {
				...state,
				credits: { isProcessing: false, errorMsg: `Error! ${action.message}`}
			}
		default:
			return state;
	}
};
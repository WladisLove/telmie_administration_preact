import * as user from '../api/user';
import { actionTypes } from './index';
import { INFO_TYPES } from '../../helpers/consts'

const setCookie = (name, value, days) => {
	var expires = "";
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
const eraseCookie = (name) => {
	document.cookie = name + '=; Max-Age=-99999999;';
}

const logInSuccess = (response, authData) => ({
	type: actionTypes.LOG_IN_SUCCESS,
	userData: response,
	userAuth: authData
});
const logInFailure = () => ({
	type: actionTypes.LOG_IN_FAILURE
});
const loggedOff = (response) => ({
	type: actionTypes.LOGGED_OFF
});
const getUsersFailure = (message) => ({
	type: actionTypes.ERROR_GETTING_USERS,
	message,
})
const clearAction = (type) => ({ type });
const setArrAction = (type, arr) => ({ type, arr });
const selectUser = (user) => ({
	type: actionTypes.SELECT_USER,
	user
});
const clearUser = () => ({
	type: actionTypes.CLEAR_USER,
});
const editUserSuccess = (user) => ({
	type: actionTypes.EDIT_USER_SUCCESS,
	user,
});
const manipulateUserFailure = (message, manipType) => ({
	type: actionTypes.MANIPULATE_USER_FAILURE,
	message,
	manipType,
});
const changeAUStatusSuccess = (user) => ({
	type: actionTypes.CHANGE_A_U_STATUS_SUCCESS,
	user,
});
const modifyUserFailure = (message) => ({
	type: actionTypes.MODIFY_USER_FAILURE,
	message,
});
const modifyU = () => ({
	type: actionTypes.START_MODIFY_USER,
});
const restoreAUSuccess = (user) => ({
	type: actionTypes.RESTORE_USER_SUCCESS,
	user,
});
const setUserInfoList = (infoList, infoType) => ({
	type: actionTypes.SET_USER_INFO_LIST,
	infoList,
	infoType,
});

export const logIn = (authData) => async (dispatch) => {
	const response = await user.logIn(authData);
	Object.keys(response).length === 0 ? (
		dispatch(logInFailure())
	) : (
			dispatch(logInSuccess(response, authData)),
			setCookie('USER_AUTH', authData, 30)
		)
};

export const logOff = () => (dispatch) => {
	dispatch(loggedOff());
	eraseCookie('USER_AUTH');
};

export const checkIfLoggedIn = () => /(^|;)\s*USER_AUTH=/.test(document.cookie);

export const getActiveUsers = (authData) => async (dispatch) => {
	dispatch(clearActiveUsers()); // when updating starts (for spinner)
	let page = 0;
	let usersArr = [];
	do {
		let response = await user.getActiveUsers(authData, page) || {};
		response.error && dispatch(getUsersFailure(response.message));
		if (Array.isArray(response.results)) {
			if (response.results.length < 2000 || page >= 5) { // in 'page >= 5' set a limit for 10.000 items
				usersArr = [...usersArr, ...response.results];
				dispatch(setArrAction(actionTypes.SET_ACTIVE_USERS, usersArr));
				break;
			} else {
				usersArr = [...usersArr, ...response.results];
				page++;
			}
		}
	} while (true);
};
export const clearActiveUsers = () => (dispatch) => {
	dispatch(clearAction(actionTypes.CLEAR_ACTIVE_USERS));
};

export const getArchivedUsers = (authData) => async (dispatch) => {
	dispatch(clearArchivedUsers());
	const response = await user.getArchivedUsers(authData);
	response.error ?
		dispatch(getUsersFailure(response.message))
		: dispatch(setArrAction(actionTypes.SET_ARCHIVED_USERS, response));
};
export const clearArchivedUsers = () => (dispatch) => {
	dispatch(clearAction(actionTypes.CLEAR_ARCHIVED_USERS));
};

export const getIncompleteUsers = (authData) => async (dispatch) => {
	dispatch(clearIncompleteUsers());
	const response = await user.getIncompleteUsers(authData);
	response.error ?
		dispatch(getUsersFailure(response.message))
		: dispatch(setArrAction(actionTypes.SET_INCOMPLETE_USERS, response));
};
export const clearIncompleteUsers = () => (dispatch) => {
	dispatch(clearAction(actionTypes.CLEAR_INCOMPLETE_USERS));
};

export const getInvites = (authData) => async (dispatch) => {
	dispatch(clearInvites());
	const response = await user.getInvites(authData);
	response.error ?
		dispatch(getUsersFailure(response.message))
		: dispatch(setArrAction(actionTypes.SET_INVITES, response));
};
export const clearInvites = () => (dispatch) => {
	dispatch(clearAction(actionTypes.CLEAR_INVITES));
};

export const getCalls = (authData, start = '', end = '') => async (dispatch) => {
	const queryArr = [];
	start && queryArr.push({
		name: 'startDate',
		value: start
	});
	end && queryArr.push({
		name: 'endDate',
		value: end
	});
	dispatch(clearCalls());
	const response = await user.getCalls(authData, queryArr);
	response.error ?
		dispatch(getUsersFailure(response.message))
		: dispatch(setArrAction(actionTypes.SET_CALLS, response.results));
};
export const clearCalls = () => (dispatch) => {
	dispatch(clearAction(actionTypes.CLEAR_CALLS));
};

export const getTransactions = (authData, start = '', end = '') => async (dispatch) => {
	const queryArr = [];
	start && queryArr.push({
		name: 'startDate',
		value: start
	});
	end && queryArr.push({
		name: 'endDate',
		value: end
	});
	dispatch(clearTransactions());
	const response = await user.getTransactions(authData, queryArr);
	response.error ?
		dispatch(getUsersFailure(response.message))
		: dispatch(setArrAction(actionTypes.SET_TRANSACTIONS, response.results));
};
export const clearTransactions = () => (dispatch) => {
	dispatch(clearAction(actionTypes.CLEAR_TRANSACTIONS));
};

export const clearSelectedUser = () => (dispatch) => {
	dispatch(clearUser());
};
export const chooseSelectedUser = (_user, authData) => async (dispatch) => {
	dispatch(clearUser());
	const response = await user.getUserInfo(_user.id, authData);
	response.error ?
		dispatch(manipulateUserFailure(response.message, 'get'))
		: dispatch(selectUser(response));
};

export const deleteUser = (id, value, authData, updateAU = true) => async (dispatch) => {
	const response = await user.deleteUser(id, authData, value);
	if (value) {
		response.error ?
			dispatch(manipulateUserFailure(response.message, 'delete'))
			: (
				dispatch(clearUser()),
				updateAU && dispatch(getActiveUsers(authData))
			);
	} else {
		response.error ?
			dispatch(modifyUserFailure(`${response.message} (Error in restoring user)`))
			: (
				dispatch(restoreAUSuccess(response)),
				dispatch(getArchivedUsers(authData))
			);
	}

};

export const editUser = (data, id, authData, updateAU = true) => async (dispatch) => {
	dispatch(modifyU());
	const response = await user.editUser(data, id, authData);
	response.error ?
		dispatch(manipulateUserFailure(response.message, 'edit'))
		: (
			dispatch(editUserSuccess(response)),
			updateAU && dispatch(getActiveUsers(authData))
		);
};

export const changeActiveUserStatus = (id, value, authData, updateAU = true) => async (dispatch) => {
	dispatch(modifyU());
	const response = await user.changeActiveUserStatus(id, authData, value);
	response.error ?
		dispatch(modifyUserFailure(`${response.message} (Error in changing user status)`))
		: (
			dispatch(changeAUStatusSuccess(response)),
			updateAU && dispatch(getActiveUsers(authData))
		);
}

export const changeProStatus = (id, value, authData, updateAU = true) => async (dispatch) => {
	dispatch(modifyU());
	const response = await user.changeProStatus(id, authData, value);
	response.error ?
		dispatch(modifyUserFailure(`${response.message} (Error in changing PRO status)`))
		: (
			dispatch(changeAUStatusSuccess(response)),
			updateAU && dispatch(getActiveUsers(authData))
		);
}

export const getUsActivities = (id, authData) => async (dispatch) => {
	dispatch(modifyU())
	const response = await user.getUsActivities(id, authData);
	response.error ?
		dispatch(modifyUserFailure(`${response.message} (Error in getting ${INFO_TYPES.ACTIVITIES.toLowerCase()})`))
		: dispatch(setUserInfoList(response.results, INFO_TYPES.ACTIVITIES));
}
export const getUsClients = (id, authData) => async (dispatch) => {
	dispatch(modifyU());
	const response = await user.getUsClient(id, authData);
	response.error ?
		dispatch(modifyUserFailure(`${response.message} (Error in getting ${INFO_TYPES.CLIENTS.toLowerCase()})`))
		: dispatch(setUserInfoList(response.results, INFO_TYPES.CLIENTS));
}
export const getUsProsList = (id, authData) => async (dispatch) => {
	dispatch(modifyU())
	const response = await user.getUsProsList(id, authData);
	response.error ?
		dispatch(modifyUserFailure(`${response.message} (Error in getting list of pros)`))
		: dispatch(setUserInfoList(response, INFO_TYPES.LIST_OF_PROS));
}
export const getUsMoney = (id, page, size, authData) => async (dispatch) => {
	dispatch(modifyU())
	const response = await user.getUsMoney(id, page, size, authData);
	response.error ?
		dispatch(modifyUserFailure(`${response.message} (Error in getting list of money)`))
		: dispatch(setUserInfoList(response, INFO_TYPES.MONEY));
}

export const addFreeCredits = (amount, id, authData) => async (dispatch) => {
	dispatch({ type: actionTypes.ADD_CREDITS_START, })
	const response = await user.addFreeCredits(amount, id, authData);
	response.error ?
		dispatch({
			type: actionTypes.ADD_CREDITS_FAILURE,
			message: response.message,
		})
		: dispatch({ type: actionTypes.ADD_CREDITS_SUCCESS, })
}
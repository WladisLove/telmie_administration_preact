import * as user from '../api/user';
import { actionTypes } from './index';

const setCookie = (name,value,days) => {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
const eraseCookie = (name) => {
    document.cookie = name+'=; Max-Age=-99999999;';
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
const getUsersFailure = (message) =>({
	type: actionTypes.ERROR_GETTING_USERS,
	message,
})
const setActiveU = (users) => ({
	type: actionTypes.SET_ACTIVE_USERS,
	users
});
const clearActiveU = () => ({
	type: actionTypes.CLEAR_ACTIVE_USERS,
});
const setArchivedU = (users) => ({
	type: actionTypes.SET_ARCHIVED_USERS,
	users
});
const clearArchivedU = () => ({
	type: actionTypes.CLEAR_ARCHIVED_USERS,
});
const selectUser = (user) => ({
	type: actionTypes.SELECT_USER,
	user
});
const editUserSuccess = (user) => ({
	type: actionTypes.EDIT_USER_SUCCESS,
	user,
});
const editUserFailure = () => ({
	type: actionTypes.EDIT_USER_FAILURE,
});
const changeAUStatusSuccess = (user) => ({
	type: actionTypes.CHANGE_A_U_STATUS_SUCCESS,
	user,
});
const changeAUStatusFailure = (message) =>({
	type: actionTypes.CHANGE_A_U_STATUS_FAILURE,
	message,
});
const modifyU = () =>({
	type: actionTypes.START_MODIFY_USER,
});

export const logIn = (authData) => async (dispatch) => {
	const response = await user.logIn(authData);
	Object.keys(response).length === 0 ?(
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

export const checkIfLoggedIn = () =>  /(^|;)\s*USER_AUTH=/.test(document.cookie);

export const getActiveUsers = (authData) => async (dispatch) => {
	dispatch(clearActiveU()); // when updating starts (for spinner)
	const response = await user.getActiveUsers(authData);
	response.error ? 
		dispatch(getUsersFailure(response.message))
		: dispatch(setActiveU(response));
};
export const clearActiveUsers = () => (dispatch) => {
	dispatch(clearActiveU());
};

export const getArchivedUsers = (authData) => async (dispatch) => {
	dispatch(clearArchivedU());
	const response = await user.getArchivedUsers(authData);
	response.error ? 
		dispatch(getUsersFailure(response.message))
		: dispatch(setArchivedU(response));
};
export const clearArchivedUsers = () => (dispatch) => {
	dispatch(clearArchivedU());
};

export const clearSelectedUser = () => (dispatch) => {
	dispatch(selectUser(null));
};
export const chooseSelectedUser = (user) => (dispatch) => {
	dispatch(selectUser(user));
};

export const editUser = (data, id, authData) => async (dispatch) => {
	dispatch(selectUser(null)); // when updating starts (for spinner) !!!check it when error
	const response = await user.editUser(data, id, authData);
	response.error ? 
		dispatch(editUserFailure(response.message))
		: dispatch(editUserSuccess(response));
};

export const changeActiveUserStatus = (id, authData) => async (dispatch) => {
	dispatch(modifyU())
	const response = await user.changeActiveUserStatus(id, authData);
	response.error ?
		dispatch(changeAUStatusFailure(response.message))
		: dispatch(changeAUStatusSuccess(response));
}
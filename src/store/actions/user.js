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
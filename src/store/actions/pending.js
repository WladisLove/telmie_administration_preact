import * as pending from '../api/pending';
import { actionTypes } from './index';


const getPendingsFailure = (message) =>({
	type: actionTypes.PENDINGS_GETTING_FAILURE,
	message,
});
const setPendings = (pendings) => ({
	type: actionTypes.SET_PENDINGS,
	pendings
});
const clearPendingsArr = () => ({
	type: actionTypes.CLEAR_PENDINGS,
});


const activateUserStart = () => ({
	type: actionTypes.START_ACTIVATE_USER,
});
const activateUserFailure = () => ({
	type: actionTypes.ACTIVATE_USER_FAILURE,
});
const activateUserSuccess = () => ({
	type: actionTypes.ACTIVATE_USER_SUCCESS,
});
const clearActivateStatus = () => ({
	type: actionTypes.CLEAR_ACTIVATE_USER_STATUS,
});

export const selectPending = () => ({
	type: actionTypes.SELECT_PENDING,
});
export const unselectPending = () => ({
	type: actionTypes.UNSELECT_PENDING,
});

export const getPendings = (authData) => async (dispatch) => {
	const response = await pending.getPendings(authData);
	response.error ? 
		dispatch(getPendingsFailure(response.message))
		: dispatch(setPendings(response));
};
export const clearPendings = () => (dispatch) => {
	dispatch(clearPendingsArr());
};

export const activateUser = (id, authData) => async (dispatch) => {
	dispatch(activateUserStart());
	const response = await pending.activateUser(id, authData);
	response.error ? 
		dispatch(activateUserFailure(response.message))
		: (
			dispatch(activateUserSuccess()),
			dispatch(getPendings(authData))
		);
}
export const clearActivateUserStatus = () => (dispatch) => dispatch(clearActivateStatus());
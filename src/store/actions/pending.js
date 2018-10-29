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
const selectPending = (pending) => ({
	type: actionTypes.SELECT_PENDING,
	pending
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

export const getPendings = (authData) => async (dispatch) => {
	const response = await pending.getPendings(authData);
	response.error ? 
		dispatch(getPendingsFailure(response.message))
		: dispatch(setPendings(response));
};
export const clearPendings = () => (dispatch) => {
	dispatch(clearPendingsArr());
};

export const getSelectedPending = (id, authData) => async (dispatch) => {
	const response = await pending.getPending(id, authData);
	response.error ? 
		dispatch(getPendingsFailure(response.message))
		: dispatch(selectPending(response));
};
export const clearSelectedPending = () => (dispatch) => {
	dispatch(selectPending(null));
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
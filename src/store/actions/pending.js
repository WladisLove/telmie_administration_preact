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
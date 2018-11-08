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
const getWithdrawalsFailure = (message) => ({
	type: actionTypes.GET_WITHDRAWALS_FAILURE,
	message,
});
const setWithdrawals = (withdrawals) =>({
	type: actionTypes.SET_WITHDRAWALS,
	withdrawals,
});
const withdrawalManipulateFailure = (message, manipulation) => ({
	type: actionTypes.WITHDRAWAL_MANIPULATE_FAILURE,
	manipulation,
	message,
});
const withdrawalManipulateSuccess = (response, manipulation) => ({
	type: actionTypes.WITHDRAWAL_MANIPULATE_SUCCESS,
	//message,
	manipulation,
});
const startManipulation = () => ({
	type: actionTypes.WITHDRAWAL_MANIPULATE_START,
})

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

export const getWithdrawals = (authData) => async (dispatch) => {
	const response = await pending.getWithdrawals(authData);
	response.error ? 
		dispatch(getWithdrawalsFailure(response.message))
		: dispatch(setWithdrawals(response));
};

export const getWithdrawalDetails = (id, authData) => async (dispatch) => {
	const response = await pending.getWithdrawalDetails(id, authData);
	console.log('[getWithdrawalDetails] response',response);
	/*response.error ? 
		dispatch(withdrawalManipulateFailure(response.message))
		: dispatch(setWithdrawals(response));*/
};
export const approveWithdrawal = (id, authData) => async (dispatch) => {
	dispatch(startManipulation());
	const response = await pending.approveWithdrawal(id, authData);
	response.error ? 
		dispatch(withdrawalManipulateFailure(response.message, 'approved'))
		: (
			dispatch(withdrawalManipulateSuccess(response, 'approved')),
			dispatch(getWithdrawals(authData))
		);
};
export const declineWithdrawal = (id, authData) => async (dispatch) => {
	dispatch(startManipulation());
	const response = await pending.declineWithdrawal(id, authData);
	response.error ? 
		dispatch(withdrawalManipulateFailure(response.message, 'declined'))
		: (
			dispatch(withdrawalManipulateSuccess(response, 'declined')),
			dispatch(getWithdrawals(authData))
		);
};
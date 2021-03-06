// ACTION TYPES
export const actionTypes = {
	LOG_IN_SUCCESS: 'LOG_IN_SUCCESS',
	LOG_IN_FAILURE: 'LOG_IN_FAILURE',
	LOGGED_OFF: 'LOGGED_OFF',
	SET_CATEGORIES: 'SET_CATEGORIES',

	ERROR_GETTING_USERS: 'ERROR_GETTING_USERS',
	SET_ACTIVE_USERS: 'SET_ACTIVE_USERS',
	CLEAR_ACTIVE_USERS: 'CLEAR_ACTIVE_USERS',
	SET_ARCHIVED_USERS: 'SET_ARCHIVED_USERS',
	CLEAR_ARCHIVED_USERS: 'CLEAR_ARCHIVED_USERS',
	SET_INCOMPLETE_USERS: 'SET_INCOMPLETE_USERS',
	CLEAR_INCOMPLETE_USERS: 'CLEAR_INCOMPLETE_USERS',
	SET_INVITES: 'SET_INVITES',
	CLEAR_INVITES: 'CLEAR_INVITES',
	SET_CALLS: 'SET_CALLS',
	CLEAR_CALLS: 'CLEAR_CALLS',
	SET_TRANSACTIONS: 'SET_TRANSACTIONS',
	CLEAR_TRANSACTIONS: 'CLEAR_TRANSACTIONS',

	START_PROCESSING_PENDING: 'START_PROCESSING_PENDING',
	PROCESSING_PENDING_FAILURE: 'PROCESSING_PENDING_FAILURE',
	PROCESSING_PENDING_SUCCESS: 'PROCESSING_PENDING_SUCCESS',
	CLEAR_ACTIVATE_USER_STATUS: 'CLEAR_ACTIVATE_USER_STATUS',
	CHANGE_ACTIVE_USER_STATUS: 'CHANGE_ACTIVE_USER_STATUS',
	CHANGE_A_U_STATUS_SUCCESS: 'CHANGE_A_U_STATUS_SUCCESS',
	START_MODIFY_USER: 'START_MODIFY_USER',
	MODIFY_USER_FAILURE: 'MODIFY_USER_FAILURE',
	RESTORE_USER_SUCCESS: 'RESTORE_USER_SUCCESS',
	SET_USER_INFO_LIST: 'SET_USER_INFO_LIST',

	PENDINGS_GETTING_FAILURE: 'PENDINGS_GETTING_FAILURE',
	SET_PENDINGS: 'SET_PENDINGS',
	CLEAR_PENDINGS: 'CLEAR_PENDINGS',
	SET_WITHDRAWALS: 'SET_WITHDRAWALS',
	GET_WITHDRAWALS_FAILURE: 'GET_WITHDRAWALS_FAILURE',
	WITHDRAWAL_MANIPULATE_FAILURE: 'WITHDRAWAL_MANIPULATE_FAILURE',
	WITHDRAWAL_MANIPULATE_SUCCESS: 'WITHDRAWAL_MANIPULATE_SUCCESS',
	WITHDRAWAL_MANIPULATE_START: 'WITHDRAWAL_MANIPULATE_START',
	SELECT_PENDING: 'SELECT_PENDING',
	UNSELECT_PENDING: 'UNSELECT_PENDING',

	CLEAR_USER: 'CLEAR_USER',
	SELECT_USER: 'SELECT_USER',
	
	EDIT_USER_SUCCESS: 'EDIT_USER_SUCCESS',
	MANIPULATE_USER_FAILURE: 'MANIPULATE_USER_FAILURE',

	ADD_CREDITS_START: 'ADD_CREDITS_START',
	ADD_CREDITS_SUCCESS: 'ADD_CREDITS_SUCCESS',
	ADD_CREDITS_FAILURE: 'ADD_CREDITS_FAILURE',
};
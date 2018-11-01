// ACTION TYPES
export const actionTypes = {
	LOG_IN_SUCCESS: 'LOG_IN_SUCCESS',
	LOG_IN_FAILURE: 'LOG_IN_FAILURE',
	LOGGED_OFF: 'LOGGED_OFF',
	SET_CATEGORIES: 'SET_CATEGORIES',

	ERROR_GETTING_USERS: 'ERROR_GETTING_USERS',
	SET_ACTIVE_USERS: 'SET_ACTIVE_USERS',
	CLEAR_ACTIVE_USERS: 'CLEAR_ACTIVE_USERS',

	START_ACTIVATE_USER: 'START_ACTIVATE_USER',
	ACTIVATE_USER_FAILURE: 'ACTIVATE_USER_FAILURE',
	ACTIVATE_USER_SUCCESS: 'ACTIVATE_USER_SUCCESS',
	CLEAR_ACTIVATE_USER_STATUS: 'CLEAR_ACTIVATE_USER_STATUS',
	CHANGE_ACTIVE_USER_STATUS: 'CHANGE_ACTIVE_USER_STATUS',
	CHANGE_A_U_STATUS_SUCCESS: 'CHANGE_A_U_STATUS_SUCCESS',
	CHANGE_A_U_STATUS_FAILURE: 'CHANGE_A_U_STATUS_FAILURE',
	START_MODIFY_USER: 'START_MODIFY_USER',

	PENDINGS_GETTING_FAILURE: 'PENDINGS_GETTING_FAILURE',
	SET_PENDINGS: 'SET_PENDINGS',
	CLEAR_PENDINGS: 'CLEAR_PENDINGS',

	CLEAR_USER: 'CLEAR_USER',
	SELECT_USER: 'SELECT_USER',
	
	EDIT_USER_SUCCESS: 'EDIT_USER_SUCCESS',
	EDIT_USER_FAILURE: 'EDIT_USER_FAILURE',
};
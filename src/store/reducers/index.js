import { combineReducers } from 'redux';

import * as user from './user';


const rootReducer = combineReducers({
    loggedInUser: user.loggedInUser,
	logInFailure: user.logInError,
});

export default rootReducer;
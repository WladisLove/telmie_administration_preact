import { combineReducers } from 'redux';

import * as user from './user';
import * as data from './data';


const rootReducer = combineReducers({
    loggedInUser: user.loggedInUser,
    logInFailure: user.logInError,
    serverData: data.serverData,
});

export default rootReducer;
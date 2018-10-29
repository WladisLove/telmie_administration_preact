import { combineReducers } from 'redux';

import * as user from './user';
import * as data from './data';
import * as pending from './pending';


const rootReducer = combineReducers({
    loggedInUser: user.loggedInUser,
    logInFailure: user.logInError,
    serverData: data.serverData,
    usersArrays: user.usersArrays,
    pending: pending.pendingReducer,
    activateUser: pending.activateUser,
    selectedUser: user.selectedUserReducer,
});

export default rootReducer;
import { apiUrls } from './index';

export function logIn(authData){

	let headers = new Headers();
	headers.append("Authorization", "Basic " + authData);

	return fetch(apiUrls.LOG_IN, { method: 'POST', headers}).then(response => {
    if (response.status === 401){
			return {};
		}
		return response.json().then(json => {
			return json;
		});

	}, error => {
		throw new Error(error.message);
	});
}

function getUsers(url, authData){
	let headers = new Headers();
	headers.append("Authorization", "Basic " + authData);

	return fetch(url, { method: 'GET', headers}).then(response => {
		return (response.status === 403) ? 
			{
				error: true,
				message: 'Current user is not Admin',
			} 
				: 
				response.status !== 200  ? 
					response.json().then(json => ({ ...json, error: true, }))
						.catch(err => ({ error: true, message: err.message, }))
					: response.json().then(json => json);

	}, error => {
		throw new Error(error.message);
	});
}

export function getActiveUsers(authData){
	return getUsers(apiUrls.GET_ACTIVE_USERS, authData);
}
export function getArchivedUsers(authData){
	return getUsers(apiUrls.GET_ARCHIVED_USERS, authData);
}
export function getIncompleteUsers(authData){
	return getUsers(apiUrls.GET_INCOMPLETE_USERS, authData);
}
export function getInvites(authData){
	return getUsers(apiUrls.GET_INVITES, authData);
}

function userManipulation(url, method, authData, data){
	let headers = new Headers();
	method === 'PUT' && headers.append("Content-Type", "application/json ");
	headers.append("Authorization", "Basic " + authData);

	return fetch(url, { method, headers, body: JSON.stringify( data ) }).then(response => {
		return (response.status === 403) ? 
			{
				error: true,
				message: 'Current user is not Admin',
			} 
				: 
				response.status !== 200  ? 
					response.json().then(json => ({ ...json, error: true, }))
						.catch(err => ({ error: true, message: err.message, }))
					: response.json().then(json => json);

	}, error => {
		throw new Error(error.message);
	});
}

export function getUserInfo(id, authData){
	return userManipulation(apiUrls.USER_ID(id), 'GET', authData);
}
export function editUser(id, authData, data){
	return userManipulation(apiUrls.USER_ID(id), 'PUT', authData, data);
}
export function deleteUser(id, authData){
	let headers = new Headers();
	headers.append("Authorization", "Basic " + authData);

	return fetch(apiUrls.USER_ID(id), { method: 'DELETE', headers, }).then(response => {
		return (response.status === 403) ? 
			{
				error: true,
				message: 'Current user is not Admin',
			} 
				: 
				response.status !== 204  ? 
					response.json().then(json => ({ ...json, error: true, }))
						.catch(err => ({ error: true, message: err.message, }))
					: {error: false,};

	}, error => {
		throw new Error(error.message);
	});
}

function changeUserStatus(url, authData, data){
	let headers = new Headers();
	headers.append("Authorization", "Basic " + authData);
	headers.append("Content-Type", "application/json ");

	return fetch(url, { method: 'PUT', headers, body: JSON.stringify( data ) }).then(response => {
		return (response.status === 403) ? 
			{
				error: true,
				message: 'Current user is not Admin',
			} 
				: 
				response.status !== 200  ? 
					response.json().then(json => ({ ...json, error: true, }))
						.catch(err => ({ error: true, message: err.message, }))
					: response.json().then(json => json);

	}, error => {
		throw new Error(error.message);
	});
}

export function changeActiveUserStatus(id, authData, value){
	const data = {
		userId: id,
		status: 'SUSPENDED',
		value,
	};
	return changeUserStatus(apiUrls.CHANGE_ACTIVE_USER_STATUS(id), authData, data);
}

export function restoreArchivedUser(id, authData){
	let headers = new Headers();
	headers.append("Authorization", "Basic " + authData);

	return fetch(apiUrls.RESTORE_ARCHIVED_USER(id), { method: 'PUT', headers }).then(response => {
		return (response.status === 403) ? 
			{
				error: true,
				message: 'Current user is not Admin',
			} 
				: 
				response.status !== 200  ? 
					response.json().then(json => ({ ...json, error: true, }))
						.catch(err => ({ error: true, message: err.message, }))
					: response.json().then(json => json);

	}, error => {
		throw new Error(error.message);
	});
}

function getUserActivity(url, method, authData){
	let headers = new Headers();
	headers.append("Authorization", "Basic " + authData);

	return fetch(url, { method, headers }).then(response => {
		return (response.status === 403) ? 
			{
				error: true,
				message: 'Current user is not Admin',
			} 
				: 
				(response.status === 200 || response.status === 201) ? 
					response.json().then(json => json)
					: response.json().then(json => ({ ...json, error: true, }))
						.catch(err => ({ error: true, message: err.message, }));

	}, error => {
		throw new Error(error.message);
	});
}

export function getUsActivities(id, authData){
	return getUserActivity(apiUrls.GET_USER_ACTIVITY(id), 'GET', authData);
}
export function getUsClient(id, authData){
	return getUserActivity(apiUrls.GET_USER_ACTIVITY(id)+'?isPro=true', 'GET', authData);
}
export function getUsProsList(id, authData){
	return getUserActivity(apiUrls.GET_USER_LIST(id), 'GET', authData);
}
export function getUsMoney(id, page, size, authData){
	return getUserActivity(apiUrls.GET_USER_MONEY(id, page, size), 'POST', authData);
}

export function addFreeCredits(amount, id, authData){
	let headers = new Headers();
	headers.append("Authorization", "Basic " + authData);

	return fetch(apiUrls.ADD_CREDITS(amount, id), { method: 'POST', headers }).then(response => {
		return (response.status === 403) ? 
			{
				error: true,
				message: 'Current user is not Admin',
			} 
				: 
				response.status === 200  ? 
					{ error: false, }
					: { ...response, error: true };

	}, error => {
		throw new Error(error.message);
	});
}
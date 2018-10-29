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

export function getActiveUsers(authData){
	let headers = new Headers();
	headers.append("Authorization", "Basic " + authData);

	return fetch(apiUrls.GET_ACTIVE_USERS, { method: 'GET', headers}).then(response => {
		return (response.status === 403) ? 
			{
				error: true,
				message: 'Current user is not Admin',
			} 
				: 
			response.json().then(json => json);

	}, error => {
		throw new Error(error.message);
	});
}

export function getUser(id, authData){
	let headers = new Headers();
	headers.append("Authorization", "Basic " + authData);

	return fetch(apiUrls.GET_PENDING(id), { method: 'GET', headers}).then(response => {
		return (response.status === 403) ? 
			{
				error: true,
				message: 'Current user is not Admin',
			} 
				: 
			response.json().then(json => json);

	}, error => {
		throw new Error(error.message);
	});
}

/*export function editUser(id, authData){
	let headers = new Headers();
	headers.append("Authorization", "Basic " + authData);

	return fetch(apiUrls.GET_PENDING(id), { method: 'GET', headers}).then(response => {
		return (response.status === 403) ? 
			{
				error: true,
				message: 'Current user is not Admin',
			} 
				: 
			response.json().then(json => json);

	}, error => {
		throw new Error(error.message);
	});
}*/
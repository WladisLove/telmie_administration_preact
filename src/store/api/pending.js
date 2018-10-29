import { apiUrls } from './index';

export function getPendings(authData){
	let headers = new Headers();
	headers.append("Authorization", "Basic " + authData);

	return fetch(apiUrls.GET_PENDINGS, { method: 'GET', headers}).then(response => {
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

export function getPending(id, authData){
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

export function activateUser(id, authData){
	let headers = new Headers();
	headers.append("Authorization", "Basic " + authData);

	return fetch(apiUrls.ACTIVATE_USER(id), { method: 'POST', headers}).then(response => {
		return (response.status === 403) ? 
			{
				error: true,
				message: 'Current user is not Admin',
			} 
				: 
				response.status !== 200  ? {
					error: true,
					//message: 'Current user is not Admin',
				}
					:
				response.json().then(json => json);

	}, error => {
		console.log(error);
		return {
			error: true,
			message: error.message,
		}
		throw new Error(error.message);
	});
}
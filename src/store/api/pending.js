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
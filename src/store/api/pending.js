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

export function getWithdrawals(authData){
	let headers = new Headers();
	headers.append("Authorization", "Basic " + authData);

	return fetch(apiUrls.GET_WITHDRAWS, { method: 'GET', headers}).then(response => {
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

export function getWithdrawalDetails(id, authData){
	let headers = new Headers();
	headers.append("Authorization", "Basic " + authData);

	return fetch(apiUrls.GET_WITHDRAW_DETAIL(id), { method: 'GET', headers}).then(response => {
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

function withdrawalManipulation(url, method, authData){
	let headers = new Headers();
	headers.append("Authorization", "Basic " + authData);

	return fetch(url, { method, headers}).then(response => {
		return (response.status === 403) ? 
			{
				error: true,
				message: 'Current user is not Admin',
			} 
				: 
			response.status !== 200  ? 
				{ error: true, message: response.message, }
				: { error: false };

	}, error => {
		throw new Error(error.message);
	});
}

export function approveWithdrawal(id, authData){
	return withdrawalManipulation(apiUrls.APPROVE_WITHDRAW(id), 'POST', authData);
}

export function declineWithdrawal(id, authData){
	return withdrawalManipulation(apiUrls.DECLINE_WITHDRAW(id), 'DELETE', authData);
}
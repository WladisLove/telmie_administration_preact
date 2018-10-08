import { apiUrls } from './index';

export function getCategories(authData) {
	let headers = new Headers();
	headers.append("Authorization", "Basic " + authData);

	return fetch(apiUrls.GET_CATEGORIES, {method: 'GET', headers}).then(response => {
		return response.json().then(json => {
			return json;
		})
		.catch(err => {
			console.log(err);
			return { error: true }
		})
	});
}
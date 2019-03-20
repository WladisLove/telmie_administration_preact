import { apiUrls } from './index';

function sendNotification(url, method, data, authData){
    let headers = new Headers();
    headers.append("Authorization", "Basic " + authData);
    headers.append("Content-Type", "application/json ");

    return fetch(url, { method, headers, body: JSON.stringify(data) }).then(response => {
        return response.status !== 200  ? 
            ({ error: true, })
			: ({ error: false });

	}, error => {
		throw new Error(error.message);
	});
}

export function getPushList(authData) {
	let headers = new Headers();
	headers.append("Authorization", "Basic " + authData);

	return fetch(apiUrls.SEND_PUSH, {method: 'GET', headers}).then(response => {
		return response.json().then(json => {
			return json;
		})
		.catch(err => {
			console.log(err);
			return { error: true }
		})
	});
}

export function updatePush(item, authData){
    return sendNotification(apiUrls.SEND_PUSH, 'PUT', item, authData);
}

export function sendPush(users, txt, authData){
    const data = {
        users,
        title: '',
        body: txt,
    };

    return sendNotification(apiUrls.SEND_PUSH, 'POST', data, authData);
}

export function sendEmail(users, tag, authData){
    const data = {
        users,
        tag,
    };

    return sendNotification(apiUrls.SEND_EMAIL, 'POST', data, authData);
}
import { apiUrls } from './index';

function sendNotification(url, data, authData){
    let headers = new Headers();
    headers.append("Authorization", "Basic " + authData);
    headers.append("Content-Type", "application/json ");

    return fetch(url, { method: 'POST', headers, body: JSON.stringify(data) }).then(response => {
        return response.status !== 200  ? 
            ({ error: true, })
			: ({ error: false });

	}, error => {
		throw new Error(error.message);
	});
}

export function sendPush(users, txt, authData){
    const data = {
        users,
        title: '',
        body: txt,
    };

    return sendNotification(apiUrls.SEND_PUSH, data, authData);
}

export function sendEmail(users, tag, authData){
    const data = {
        users,
        tag,
    };

    return sendNotification(apiUrls.SEND_EMAIL, data, authData);
}
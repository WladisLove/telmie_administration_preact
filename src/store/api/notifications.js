import { apiUrls } from './index';

export function sendPush(users, txt, authData){
	let headers = new Headers();
    headers.append("Authorization", "Basic " + authData);
    headers.append("Content-Type", "application/json ");

    const data = {
        users,
        title: '',
        body: txt,
    };

	return fetch(apiUrls.SEND_PUSH, { method: 'POST', headers, body: JSON.stringify(data) }).then(response => {
        return response.status !== 200  ? 
            ({ error: true, })
			: ({ error: false });

	}, error => {
		throw new Error(error.message);
	});
}
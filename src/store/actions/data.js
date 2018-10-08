import * as api from '../api/data';
import { actionTypes } from './index';

const setCategories = (response) => ({
	type: actionTypes.SET_CATEGORIES,
	categories: response
});

export const getCategories = (authData) => async (dispatch) => {
	let response = await api.getCategories(authData);

	!response.error && dispatch(setCategories(response));
}
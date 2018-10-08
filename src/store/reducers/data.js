import { actionTypes } from '../actions';

export const serverData = (state = {}, action) => {
	switch (action.type){
		case actionTypes.SET_CATEGORIES:
			let categories = action.categories.reduce((prevCategories, category) => {
				let { name } = category;

				return {
					categories: [...prevCategories.categories, name],
					subCategories: {
						...prevCategories.subCategories, 
						[name]: category.childs.map(categoryChild => categoryChild.name)
					},
				}

			}, {categories: [], subCategories: {}});

			return {
				...state,
				...categories,
			}
		default:
			return state;
	}
}
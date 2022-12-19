import { SPACE_HISTORY, SPACE_ADDRESS, SEARCH_TXT } from './actionTypes';

export const storeHistory = (data) => {
	return ({
		type: SPACE_HISTORY,
		payload: data
	})
}

export const storeAddress = (data) => {
	return ({
		type: SPACE_ADDRESS,
		payload: data
	})
}

export const storeSearchTxt = (text) => {
	return ({
		type: SEARCH_TXT,
		payload: text
	})
}
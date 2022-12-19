import { combineReducers } from "redux";

const initialState = {
	historyData: [],
	addressData: [],
	searchTxt: ''
}
const spaceXReducer = (state = initialState, action) => {
	const { payload, type } = action;
	switch (type) {
		case 'SPACE_HISTORY':
			return (
				{ ...state, historyData: payload }
			)
		case 'SPACE_ADDRESS':
			return (
				{ ...state, addressData: payload }
			)
		case 'SEARCH_TXT':
			return (
				{ ...state, searchTxt: payload }
			)
		default:
			return state
	}

}



export const rootReducer = combineReducers({
	spaceXRed: spaceXReducer
})

import { combineReducers } from 'redux'

export default combineReducers({
	keys: (state = {}, action) => state,
	notifications: (state = {}, action) => state,
	conversations: (state = {}, action) => state,
	settings: (state = {}, action) => state,
});
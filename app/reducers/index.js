import { combineReducers } from 'redux'
import conversationsReducer from './conversations'


export default combineReducers({
	keys: (state = [], action) => state,
	notifications: (state = [], action) => state,
	conversations: conversationsReducer,
	settings: (state = {}, action) => state,
})
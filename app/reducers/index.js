import { combineReducers } from 'redux'
import conversationsReducer from './conversations'
import keysReducer from './keys'
import othersReducer from './others'


export default combineReducers({
	keys: keysReducer,
	notifications: (state = [], action) => state,
	conversations: conversationsReducer,
	settings: (state = {}, action) => state,
	others: othersReducer,
})
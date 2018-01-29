import { combineReducers } from 'redux'
import conversationsReducer from './conversations'
import keysReducer from './keys'


export default combineReducers({
	keys: keysReducer,
	notifications: (state = [], action) => state,
	conversations: conversationsReducer,
	settings: (state = {}, action) => state,
})
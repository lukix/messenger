import { ADD_NEW_KEY, REMOVE_FREE_KEY } from '../actionTypes/index'

const createKeysPair = (privateKey, publicKey) => {
	return {
		publicKey,
		privateKey,
	}
}
const keysReducer = (keys = [], action) => {
	switch(action.type) {
		case ADD_NEW_KEY:
			return [createKeysPair(action.privateKey, action.publicKey), ...keys]
		case REMOVE_FREE_KEY:
			return keys.filter(pair => pair.publicKey !== action.publicKey)
		default:
			return keys
	}
}

export default keysReducer
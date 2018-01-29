import { ADD_NEW_KEY } from '../actionTypes/index'

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
		default:
			return keys
	}
}

export default keysReducer
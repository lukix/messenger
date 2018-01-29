import {
	ADD_CONVERSATION,
	SEND_MESSAGE,
	CHANGE_PIN_STATE,
	ADD_NEW_KEY,
} from '../actionTypes/index'

export const addConversationAction = (publicKey) => ({
	type: ADD_CONVERSATION,
	publicKey,
})
export const sendMessageAction = (publicKey, message) => ({
	type: SEND_MESSAGE,
	publicKey,
	message,
})
export const changePinStateAction = (publicKey, pinned) => ({
	type: CHANGE_PIN_STATE,
	publicKey,
	pinned,
})
export const addNewKeyAction = (privateKey, publicKey) => ({
	type: ADD_NEW_KEY,
	privateKey,
	publicKey,
})
export const createNewKeyAction = () => {	//TODO
	return function (dispatch) {
		//dispatch() //Creating key started
		console.warn('createNewKeyAction is not implemented')
	}
}
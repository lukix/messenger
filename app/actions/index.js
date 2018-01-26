import { ADD_CONVERSATION, SEND_MESSAGE, CHANGE_PIN_STATE } from '../actionTypes/index'

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
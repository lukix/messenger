import { ADD_CONVERSATION, SEND_MESSAGE } from '../actionTypes/index'

export const addConversationAction = (publicKey) => ({
	type: ADD_CONVERSATION,
	publicKey,
})
export const sendMessageAction = (publicKey, message) => ({
	type: SEND_MESSAGE,
	publicKey,
	message,
})
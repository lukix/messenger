import webworkify from 'webworkify'
import KeyGeneratorWorker from '../others/keyGeneratorWorker'
import axios from '../others/axiosInstance'
import { encryptMessage } from '../others/Encryption'
import uuid from 'uuid/v1'
import { 
	ADD_CONVERSATION,
	CHANGE_PIN_STATE,
	ADD_NEW_KEY,
	START_CREATING_NEW_KEY,
	FINISH_CREATING_NEW_KEY,
	START_SENDING_MESSAGE,
	FINISH_SENDING_MESSAGE,
} from '../actionTypes/index'

export const addConversationAction = (publicKey) => ({
	type: ADD_CONVERSATION,
	publicKey,
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
export const startCreatingNewKey = () => ({
	type: START_CREATING_NEW_KEY,
})
export const finishCreatingNewKey = () => ({
	type: FINISH_CREATING_NEW_KEY,
})
export const startSendingMessage = (publicKey, messageContent, id) => ({
	type: START_SENDING_MESSAGE,
	publicKey,
	messageContent,
	id,
})
export const finishSendingMessage = (publicKey, id) => ({
	type: FINISH_SENDING_MESSAGE,
	publicKey,
	id,
})
export const createNewKeyAction = () => {
	return function (dispatch) {
		dispatch(startCreatingNewKey()) //Creating key started
		const worker = webworkify(KeyGeneratorWorker)
		worker.addEventListener('message', function (event) {
			const { publicKey, privateKey } = event.data
			dispatch(addNewKeyAction(privateKey, publicKey))
			dispatch(finishCreatingNewKey())
		})
	}
}
export const sendMessageAction = (recieverPublicKey, senderKeys, messageContent) => {
	return function (dispatch) {
		const messageId = uuid()
		dispatch(startSendingMessage(recieverPublicKey, messageContent, messageId))
		return encryptMessage(recieverPublicKey, senderKeys, messageContent)
			.then(encryptedMessage => axios.post('/messages', encryptedMessage))
			.then(res => {
				dispatch(finishSendingMessage(recieverPublicKey, messageId))
			})
			.catch(error => {
				console.log(error)
				//TODO: dispatch error action
			})
	}
}
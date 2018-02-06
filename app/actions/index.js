import webworkify from 'webworkify'
import KeyGeneratorWorker from '../others/keyGeneratorWorker'
import axios from '../others/axiosInstance'
import { encryptMessage, decryptMessage } from '../others/Encryption'
import { encodeMessage, decodeMessage } from '../others/Encoding'
import uuid from 'uuid/v1'
import { 
	CHANGE_PIN_STATE,
	ADD_NEW_KEY,
	START_CREATING_NEW_KEY,
	FINISH_CREATING_NEW_KEY,
	START_SENDING_MESSAGE,
	FINISH_SENDING_MESSAGE,
	START_ADDING_CONVERSATION,
	FINISH_ADDING_CONVERSATION,
	ADD_MESSAGE,
	REMOVE_FREE_KEY,
} from '../actionTypes/index'
export const startCreatingNewConversation = (publicKey) => ({
	type: START_ADDING_CONVERSATION,
	publicKey,
})
export const finishCreatingNewConversation = (publicKey, keysPair) => ({
	type: FINISH_ADDING_CONVERSATION,
	publicKey,
	keysPair,
})
export const addConversationAction = (publicKey) => {
	return function (dispatch) {
		return new Promise((resolve, reject) => {
			dispatch(startCreatingNewConversation(publicKey))
			const worker = webworkify(KeyGeneratorWorker)
			worker.addEventListener('message', function ({ data: keysPair }) {
				dispatch(finishCreatingNewConversation(publicKey, keysPair))
				resolve(keysPair)
			})
		})
	}
}
export const addConversationAndSendMessageAction = (publicKey, message) => {
	return function (dispatch) {
		dispatch(addConversationAction(publicKey)).then(keysPair => {
			dispatch(sendMessageAction(publicKey, keysPair, message))
		})
	}
}
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
			.then(encryptedMessage => axios.post('/messages', encodeMessage(encryptedMessage)))
			.then(res => {
				dispatch(finishSendingMessage(recieverPublicKey, messageId))
			})
			.catch(error => {
				console.log(error)
				//TODO: dispatch error action
			})
	}
}

export const addMessage = (senderPublicKey, messageContent, date) => ({
	type: ADD_MESSAGE,
	senderPublicKey,
	messageContent,
	date,
})
export const removeFreeKey = (publicKey) => ({
	type: REMOVE_FREE_KEY,
	publicKey,
})
export const fetchMessagesAction = (keysPair, startDate) => {
	return function (dispatch, getState) {
		//dispatch(startFetchingMessages(publicKey))
		return axios.get(
			'/messages',
			{ params: { recieverAddress: keysPair.publicKey, startDate } }
		)
			.then(({ data: encryptedMessages }) => {
				return Promise.all(encryptedMessages.map(
					message => decryptMessage(keysPair.privateKey, decodeMessage(message))
				))
					.then(messages => {
						const verifiedMessages = messages.filter(({ verified }) => verified)
						const unverifiedMessagesCount = messages.length - verifiedMessages.length
						if(unverifiedMessagesCount > 0)
							console.log(`${ unverifiedMessagesCount } unverified messages`)
						const state = getState()
						verifiedMessages.forEach(message => {
							const { senderAddress } = message
							const conversationExists = state.conversations.some(
								({ publicKey }) => publicKey === message.senderAddress
							)
							if(conversationExists) {
								dispatch(addMessage(senderAddress, message.content, message.date))
							} else {
								dispatch(startCreatingNewConversation(senderAddress))
								dispatch(finishCreatingNewConversation(senderAddress, keysPair))
								dispatch(addMessage(senderAddress, message.content, message.date))
								dispatch(removeFreeKey(keysPair.publicKey))
							}
						})
					})
			})
			.catch(error => {
				console.log(error)
				//TODO: dispatch error action
			})
	}
}
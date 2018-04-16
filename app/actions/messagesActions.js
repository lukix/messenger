import axios from '../others/axiosInstance'
import { encryptMessage, decryptMessage } from '../others/Encryption'
import { encodeMessage, decodeMessage } from '../others/Encoding'
import uuid from 'uuid/v1'
import { startCreatingNewConversation, finishCreatingNewConversation } from './conversationsActions'
import { removeFreeKey } from './keysActions'
import {
	START_SENDING_MESSAGE,
	FINISH_SENDING_MESSAGE,
	ADD_MESSAGE,
	SENDING_MESSAGE_ERROR,
	REMOVE_MESSAGE,
} from '../actionTypes/index'

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
export const sendingMessageError = (publicKey, id) => ({
	type: SENDING_MESSAGE_ERROR,
	publicKey,
	id,
})
export const removeMessage = (publicKey, id) => ({
	type: REMOVE_MESSAGE,
	publicKey,
	id,
})
export const sendMessageAction = (recieverPublicKey, senderKeys, messageContent) => {
	return function (dispatch) {
		const messageId = uuid()
		dispatch(startSendingMessage(recieverPublicKey, messageContent, messageId))
		return encryptMessage(recieverPublicKey, senderKeys, messageContent)
			.then(encryptedMessage =>
				axios.post('/messages', encodeMessage(encryptedMessage, messageId)))
			.then(res => {
				dispatch(finishSendingMessage(recieverPublicKey, messageId))
			})
			.catch(error => {
				dispatch(sendingMessageError(recieverPublicKey, messageId))
			})
	}
}

export const addMessage = (senderPublicKey, messageContent, date) => ({
	type: ADD_MESSAGE,
	senderPublicKey,
	messageContent,
	date,
})
const processVerifiedMessage = (dispatch, getState, message, keysPair) => {
	const state = getState()
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
}
export const fetchMessagesAction = (keysPair, startDate) => {
	return function (dispatch, getState) {
		return axios.get(
			'/messages',
			{ params: { recieverAddress: keysPair.publicKey, startDate } }
		)
			.then(({ data: encryptedMessages }) => (
				Promise.all(encryptedMessages.map(
					message => decryptMessage(keysPair.privateKey, decodeMessage(message))
				))
			))
			.then(messages => {
				const verifiedMessages = messages.filter(({ verified }) => verified)
				const unverifiedMessagesCount = messages.length - verifiedMessages.length
				if(unverifiedMessagesCount > 0)
					console.log(`${ unverifiedMessagesCount } unverified messages`)
				verifiedMessages.forEach(
					message => processVerifiedMessage(dispatch, getState, message, keysPair)
				)
			})
			.catch(error => {
				console.log(error)
				//TODO: dispatch error action
			})
	}
}
export const checkMessageSyncStatus = (recieverAddress, startDate, clientGeneratedId ) => {
	return function (dispatch) {
		return axios.get(
			'/messages',
			{ params: { recieverAddress, startDate, clientGeneratedId } }
		)
			.then(({ data: encryptedMessages }) => {
				dispatch(
					encryptedMessages.length > 0
						? finishSendingMessage(recieverAddress, clientGeneratedId)
						: sendingMessageError(recieverAddress, clientGeneratedId)
				)
			})
			.catch(error => {
				console.log(error)
				//TODO: dispatch error action
			})
	}
}
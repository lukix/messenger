import {
	START_SENDING_MESSAGE,
	FINISH_SENDING_MESSAGE,
	START_ADDING_CONVERSATION,
	FINISH_ADDING_CONVERSATION,
	SENDING_MESSAGE_ERROR,
	ADD_MESSAGE,
	CHANGE_PIN_STATE,
	CHANGE_CONVERSATION_NAME,
	REMOVE_MESSAGE,
	FIRE_CONVERSATION_FLASH_ANIMATION,
} from '../actionTypes/index'

const createConversation = (publicKey, keysPair) => ({
	publicKey,
	keysPair,
	name: '',
	messages: [],
	pinned: true,
	lastSyncDate: new Date(0),
	pinChangeDate: new Date(),	//side cause
})
const createMessage = (messageText, id, synced, isYours, date = new Date()) => ({
	id,
	text: messageText,
	date,
	isYours,
	synced,
})
const appendMessage = (messages, message) => {
	let position = messages.length
	for(let i = messages.length - 1; i >= 0; i--) {
		if(messages[i].date < message.date) {
			break
		}
		position = i
	}
	return [
		...messages.slice(0, position),
		message,
		...messages.slice(position),
	]
}
const addMessageToConversation = (conversation, message, id, synced,
	isYours, lastSyncDate = conversation.lastSyncDate, messageDate) => {
	const newLastSyncDate = conversation.lastSyncDate !== undefined
		? lastSyncDate > conversation.lastSyncDate
			? lastSyncDate
			: conversation.lastSyncDate
		: lastSyncDate
	return {
		...conversation,
		lastSyncDate: newLastSyncDate,
		messages: appendMessage(
			conversation.messages,
			createMessage(message, id, synced, isYours, messageDate)
		),
	}
}
const modifyMessageInConversation = (conversation, messageId, modificationObj) => ({
	...conversation,
	messages: conversation.messages.map(
		message => message.id !== messageId
			? message
			: { ...message, ...modificationObj }
	),
})
const conversationsReducer = (conversations = [], action) => {
	switch(action.type) {
		case START_ADDING_CONVERSATION:
			return [createConversation(action.publicKey, null), ...conversations]
		case FINISH_ADDING_CONVERSATION:
			return conversations.map(conversation =>
				conversation.publicKey === action.publicKey
					? createConversation(action.publicKey, action.keysPair)
					: conversation
			)
		case START_SENDING_MESSAGE:
			return conversations.map((conversation) => {
				return conversation.publicKey === action.publicKey
					?	addMessageToConversation(
						conversation,
						action.messageContent,
						action.id,
						false,
						true,
						undefined,
						new Date(),	//side cause
					)
					: conversation
			})
		case FINISH_SENDING_MESSAGE:
			return conversations.map((conversation) => {
				return conversation.publicKey === action.publicKey
					?	modifyMessageInConversation(conversation, action.id, { synced: true })
					: conversation
			})
		case SENDING_MESSAGE_ERROR:
			return conversations.map((conversation) => {
				return conversation.publicKey === action.publicKey
					?	modifyMessageInConversation(conversation, action.id, { error: true })
					: conversation
			})
		case ADD_MESSAGE:
			return conversations.map((conversation) => {
				return conversation.publicKey === action.senderPublicKey
					?	addMessageToConversation(
						conversation,
						action.messageContent,
						null,
						true,
						false,
						action.date,
						action.date,
					)
					: conversation
			})
		case REMOVE_MESSAGE:
			return conversations.map((conversation) => {
				return conversation.publicKey === action.publicKey
					?	{
						...conversation,
						messages: conversation.messages.filter(message => message.id !== action.id),
					}
					: conversation
			})
		case CHANGE_PIN_STATE:
			return conversations.map((conversation) => {
				return conversation.publicKey === action.publicKey
					?	{
						...conversation,
						pinned: action.pinned,
						pinChangeDate: action.pinChangeDate,
					}
					: conversation
			})
		case CHANGE_CONVERSATION_NAME:
			return conversations.map((conversation) => {
				return conversation.publicKey === action.publicKey
					?	Object.assign({}, conversation, { name: action.newName })
					: conversation
			})
		case FIRE_CONVERSATION_FLASH_ANIMATION:
			return conversations.map((conversation) => {
				return conversation.publicKey === action.publicKey
					?	{
						...conversation,
						animationId: action.animationId,
					}
					: conversation
			})
		default:
			return conversations
	}
}

export default conversationsReducer
import {
	START_SENDING_MESSAGE,
	FINISH_SENDING_MESSAGE,
	START_ADDING_CONVERSATION,
	FINISH_ADDING_CONVERSATION,
	ADD_MESSAGE,
	CHANGE_PIN_STATE,
	CHANGE_CONVERSATION_NAME,
} from '../actionTypes/index'

const createConversation = (publicKey, keysPair) => ({
	publicKey,
	keysPair,
	name: '',
	messages: [],
	pinned: true,
	lastSyncDate: undefined,
})
const createMessage = (messageText, id, synced, isYours) => ({
	id,
	text: messageText,
	date: new Date(),		//side cause
	isYours,
	synced,
})
const addMessageToConversation = (conversation, message, id, synced,
	isYours, lastSyncDate = conversation.lastSyncDate) => Object.assign(
	{},
	conversation,
	{ messages: [...conversation.messages, createMessage(message, id, synced, isYours)] },
	conversation.lastSyncDate !== undefined
		? new Date(lastSyncDate) > new Date(conversation.lastSyncDate)
			? { lastSyncDate }
			: {}
		: { lastSyncDate }
)
const syncMessageInConversation = (conversation, messageId) => ({
	...conversation,
	messages: conversation.messages.map(
		message => message.id !== messageId
			? message
			: { ...message, synced: true }
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
					)
					: conversation
			})
		case FINISH_SENDING_MESSAGE:
			return conversations.map((conversation) => {
				return conversation.publicKey === action.publicKey
					?	syncMessageInConversation(conversation, action.id)
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
						action.date
					)
					: conversation
			})
		case CHANGE_PIN_STATE:
			return conversations.map((conversation) => {
				return conversation.publicKey === action.publicKey
					?	Object.assign({}, conversation, { pinned: action.pinned })
					: conversation
			})
		case CHANGE_CONVERSATION_NAME:
			return conversations.map((conversation) => {
				return conversation.publicKey === action.publicKey
					?	Object.assign({}, conversation, { name: action.newName })
					: conversation
			})
		default:
			return conversations
	}
}

export default conversationsReducer
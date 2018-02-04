import {
	START_SENDING_MESSAGE,
	FINISH_SENDING_MESSAGE,
	START_ADDING_CONVERSATION,
	FINISH_ADDING_CONVERSATION,
	CHANGE_PIN_STATE,
} from '../actionTypes/index'

const createConversation = (publicKey, keysPair) => ({
	publicKey,
	keysPair,
	name: '',
	messages: [],
	pinned: true,
})
const createMessage = (messageText, id, synced) => ({
	id,
	text: messageText,
	date: new Date(),		//side cause
	isYours: true,
	synced,
})
const addMessageToConversation = (conversation, message, id, synced) => Object.assign(
	{},
	conversation,
	{ messages: [...conversation.messages, createMessage(message, id, synced)] }
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
						false
					)
					: conversation
			})
		case FINISH_SENDING_MESSAGE:
			return conversations.map((conversation) => {
				return conversation.publicKey === action.publicKey
					?	syncMessageInConversation(conversation, action.id)
					: conversation
			})
		case CHANGE_PIN_STATE:
			return conversations.map((conversation) => {
				return conversation.publicKey === action.publicKey
					?	Object.assign({}, conversation, { pinned: action.pinned })
					: conversation
			})
		default:
			return conversations
	}
}

export default conversationsReducer
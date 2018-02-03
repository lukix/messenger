import {
	START_SENDING_MESSAGE,
	FINISH_SENDING_MESSAGE,
	ADD_CONVERSATION,
	CHANGE_PIN_STATE,
} from '../actionTypes/index'

const createConversation = (publicKey) => ({
	publicKey,
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
		case ADD_CONVERSATION:
			return [createConversation(action.publicKey), ...conversations]
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
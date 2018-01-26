import { SEND_MESSAGE, ADD_CONVERSATION } from '../actionTypes/index'

const createConversation = (publicKey) => ({
	publicKey,
	name: '',
	messages: [],
	pinned: false,
})
const createMessage = (messageText) => ({
	text: messageText,
	date: new Date(),		//side cause
	isYours: true,
})
const addMessageToConversation = (conversation, message) => Object.assign(
	{},
	conversation,
	{ messages: [...conversation.messages, createMessage(message)] }
)
const conversationsReducer = (conversations = [], action) => {
	switch(action.type) {
		case ADD_CONVERSATION:
			return [createConversation(action.publicKey), ...conversations]
		case SEND_MESSAGE:
			return conversations.map((conversation) => {
				return conversation.publicKey === action.publicKey
					?	addMessageToConversation(conversation, action.message)
					: conversation
			})
		default:
			return conversations
	}
}

export default conversationsReducer
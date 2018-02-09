
const deserializeMessages = (messages) => messages.map(
	message => ({ ...message, date: new Date(message.date) })
)
const deserializeConversations = (conversations) => conversations.map(
	conversation => ({
		...conversation,
		messages: deserializeMessages(conversation.messages),
		lastSyncDate: new Date(conversation.lastSyncDate),
		pinChangeDate: new Date(conversation.pinChangeDate),
	})
)
export const deserialize = (state) => {
	return {
		...state,
		conversations: deserializeConversations(state.conversations),
	}
}
export const serialize = (state) => {
	return state
}
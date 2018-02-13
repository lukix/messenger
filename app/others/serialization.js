
const deserializeMessages = (messages) => messages.map(
	message => ({
		...message,
		date: new Date(message.date),
		error: message.error || !message.synced,
	})
)
const deserializeConversations =
	(conversations) => conversations
		.filter(({ keysPair }) => keysPair !== null)	
		.map(
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
		others: {
			...state.others,
			keyRequestInProgress: false,
		},
	}
}
export const serialize = (state) => {
	return {
		...state,
	}
}
import { checkMessageSyncStatus } from '../actions/messagesActions'

export const fixNotSyncedMessages = (conversations, dispatch) => {
	conversations.reduce(
		((notSyncedMessages, conversation) => [
			...notSyncedMessages,
			...conversation.messages
				.filter(message => !message.synced)
				.map(message => ({
					publicKey: conversation.publicKey,
					date: message.date,
					messageId: message.id })
				),
		]),
		[]
	)
		.forEach(({ publicKey, date, messageId }) =>
			dispatch(checkMessageSyncStatus(publicKey, date, messageId))
		)
}
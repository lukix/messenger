import React from 'react'
import ConversationCard from './ConversationCard'

const style = {
	main: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
		width: '100%',
	},
}
const conversationComparisonByDate = (conv1, conv2) => {
	const v1 = conv1.messages[conv1.messages.length - 1].date
	const v2 = conv2.messages[conv2.messages.length - 1].date
	return v1 < v2 ? 1 : -1
}
const conversationComparisonByPinDate = (conv1, conv2) => {
	const v1 = conv1.pinChangeDate
	const v2 = conv2.pinChangeDate
	return v1 > v2 ? 1 : -1
}
export default function ConversationsList({
	style: customStyle,
	cardStyle,
	unpinnedConversations,
	pinnedConversations,
	onMessageSend,
	removeMessage,
	resendMessage,
	onPinStateChange,
	onConversationNameChange,
}) {
	const conversations = [
		...pinnedConversations.sort(conversationComparisonByPinDate),
		...unpinnedConversations.sort(conversationComparisonByDate),
	]
	const conversationsList = conversations.map(
		(conversation, index) =>
			<ConversationCard
				key={ index }
				style={ cardStyle }
				conversation={ conversation }
				onMessageSend={ onMessageSend }
				removeMessage={ removeMessage }
				resendMessage={ resendMessage }
				onPinStateChange={ onPinStateChange }
				onConversationNameChange={ onConversationNameChange }
			/>
	)
	return <div style={{ ...style.main, ...customStyle }}>
		{ conversationsList }
	</div>
}
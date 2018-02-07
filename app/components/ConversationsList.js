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
export default function ConversationsList({
	style: customStyle,
	cardStyle,
	unpinnedConversations,
	pinnedConversations,
	onMessageSend,
	onPinStateChange,
	onConversationNameChange,
}) {
	const conversations = [...pinnedConversations, ...unpinnedConversations]
	const conversationsList = conversations.map(
		(conversation, index) =>
			<ConversationCard
				key={ index }
				style={ cardStyle }
				conversation={ conversation }
				onMessageSend={ onMessageSend }
				onPinStateChange={ onPinStateChange }
				onConversationNameChange={ onConversationNameChange }
			/>
	)
	return <div style={{ ...style.main, ...customStyle }}>
		{ conversationsList }
	</div>
}
import React from 'react'
import ConversationCard from './ConversationCard'

const style = {
	main: {
		
	},
}
export default function ConversationsList({
	style: customStyle,
	cardStyle,
	conversations,
	onMessageSend,
}) {
	const conversationsList = conversations.map(
		(conversation, index) =>
			<ConversationCard
				key={ index }
				style={ cardStyle }
				conversation={ conversation }
				onMessageSend={ onMessageSend }
			/>
	)
	return <div style={{ ...style.main, ...customStyle }}>
		{ conversationsList }
	</div>
}
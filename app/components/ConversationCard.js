import React from 'react'
import Card from './Card'
import SharedStyles from '../others/SharedStyles'
import Message from './Message'
import { Scrollbars } from 'react-custom-scrollbars'
import MessageSendPanel from './MessageSendPanel'

const style = {
	main: {},
	header: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		fontWeight: 'bold',
		fontSize: '1.1rem',
	},
	pin: {
		height: '24px',
		cursor: 'pointer',
	},
	conversationBox: {
		...SharedStyles.textFields,
		margin: '10px 0',
	},
	scrollArea: {
		padding: '10px',
	},
}
export default function ConversationCard({
	style: customStyle,
	conversation,
	onMessageSend,
	onPinChange,
}) {
	const { name: contactName, publicKey: contactKey, messages, pinned } = conversation
	const conversationName = contactName ? contactName : contactKey
	const pinnedStateStyle = { filter: pinned ? 'grayscale(0%)' : 'grayscale(100%)' }
	const messagesList = messages.map(
		(message, index) =>
			<Message key={ index } left={ !message.isYours }>{ message.text }</Message>
	)
	const scrollbarProps = {
		autoHide: true,
		autoHideTimeout: 500,
		autoHeight: true,
		autoHeightMin: 100,
		autoHeightMax: 300,
	}
	return <Card style={{ ...style.main, ...customStyle }}>
		<header style={ style.header }>
			<div>{ conversationName }</div>
			<div>
				<img
					src="./img/pin.png"
					alt="pin"
					style={{ ...style.pin, ...pinnedStateStyle }}
					onClick={ () => onPinChange(!pinned) }
				/>
			</div>
		</header>
		<div style={ style.conversationBox }>
			<Scrollbars {...scrollbarProps}>
				<div style={ style.scrollArea }>
					{ messagesList }
				</div>
			</Scrollbars>
		</div>
		<MessageSendPanel onMessageSend={ onMessageSend } />
	</Card>
}
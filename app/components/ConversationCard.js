import React from 'react'
import Card from './Card'
import TextareaAutosize from 'react-autosize-textarea'
import SharedStyles from '../others/SharedStyles'

const style = {
	main: {

	},
	header: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		fontWeight: 'bold',
	},
	pin: {
		height: '24px',
		cursor: 'pointer',
	},
	conversationBox: {
		...SharedStyles.textFields,
		height: '100px',
		margin: '10px 0',
	},
	textarea: {
		...SharedStyles.textFields,
		width: '100%',
		padding: '8px 8px',
		resize: 'none',
		marginRight: '8px',
	},
	newMessageBox: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
	},
	button: {
		...SharedStyles.button,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
}
export default function ConversationCard({ style: customStyle }) {
	return <Card style={{ ...style.main, ...customStyle }}>
		<header style={ style.header }>
			<div>Roger Federer</div>
			<div>
				<img src="./img/pin.png" alt="pin" style={ style.pin } />
			</div>
		</header>
		<div style={ style.conversationBox }>
			
		</div>
		<div style={ style.newMessageBox }>
			<TextareaAutosize style={ style.textarea } placeholder='Type a message...' />
			<button style={ style.button }>
				<i className="fa fa-paper-plane-o" aria-hidden="true"></i>
			</button>
		</div>
	</Card>
}
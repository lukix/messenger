import React from 'react'
import MessageSendPanel from '../MessageSendPanel'

const style = {
	main: {
		paddingTop: '15px',
	},
}
export default function NewConversation({ style: customStyle, publicKey }) {
	return <div style={{ ...style.main, ...customStyle }}>
		<b>Start a conversation with { publicKey }</b><br />
		<MessageSendPanel style={{ marginTop: '5px' }} />
	</div>
}
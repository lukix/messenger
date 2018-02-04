import React from 'react'
import MessageSendPanel from '../MessageSendPanel'

const style = {
	main: {
		paddingTop: '15px',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
	},
}
export default class NewConversation extends React.Component {
	constructor(props) {
		super(props)
		this.messageSendHandler = this.messageSendHandler.bind(this)
	}
	messageSendHandler(message) {
		this.props.onMessageSend(this.props.publicKey, message)
	}
	render() {
		const { style: customStyle, publicKey } = this.props
		return <div style={{ ...style.main, ...customStyle }}>
			<b>Start a conversation with { publicKey }</b><br />
			<MessageSendPanel
				style={{ marginTop: '5px' }}
				onMessageSend={ this.messageSendHandler }
			/>
		</div>
	}
}
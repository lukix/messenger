import React from 'react'
import MessageSendPanel from '../MessageSendPanel'

const style = {
	main: {
		paddingTop: '15px',
		textOverflow: 'ellipsis',
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
		const { style: customStyle, publicKey, customText } = this.props
		const infoText = customText === undefined
			? `Start a conversation with ${publicKey}`
			: customText
		const whitespaceStyle = customText === undefined ? { whiteSpace: 'nowrap' } : {}
		return <div style={{ ...style.main, ...whitespaceStyle, ...customStyle  }}>
			<b>{infoText}</b><br />
			<MessageSendPanel
				style={{ marginTop: '5px' }}
				onMessageSend={ this.messageSendHandler }
			/>
		</div>
	}
}
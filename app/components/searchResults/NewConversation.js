import React from 'react'
import MessageSendPanel from '../MessageSendPanel'

const style = {
	main: {
		paddingTop: '15px',
	},
}
export default class NewConversation extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			customStyle: props.style,
			publicKey: props.publicKey,
			onMessageSend: props.onMessageSend,
		}
		this.messageSendHandler = this.messageSendHandler.bind(this)
	}
	componentWillReceiveProps(newProps) {
		this.setState({ ...newProps })
	}
	messageSendHandler(message) {
		this.state.onMessageSend(this.state.publicKey, message)
	}
	render() {
		const { customStyle, publicKey } = this.state
		return <div style={{ ...style.main, ...customStyle }}>
			<b>Start a conversation with { publicKey }</b><br />
			<MessageSendPanel
				style={{ marginTop: '5px' }}
				onMessageSend={ this.messageSendHandler }
			/>
		</div>
	}
}
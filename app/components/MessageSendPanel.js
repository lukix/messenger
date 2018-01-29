import React from 'react'
import SharedStyles from '../others/SharedStyles'
import TextareaAutosize from 'react-autosize-textarea'

const style = {
	main: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
	},
	textarea: {
		...SharedStyles.textFields,
		width: '100%',
		padding: '8px 8px',
		resize: 'none',
		marginRight: '8px',
	},
	button: {
		...SharedStyles.button,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
}
export default class MessageSendPanel extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			messageText: '',
		}
		this.onChange = this.onChange.bind(this)
		this.keyPressHandler = this.keyPressHandler.bind(this)
		this.messageSendHandler = this.messageSendHandler.bind(this)
	}
	onChange(event) {
		this.setState({ messageText: event.target.value })
	}
	messageSendHandler() {
		this.props.onMessageSend(this.state.messageText)
		this.setState({ messageText: '' })
	}
	keyPressHandler(event) {
		if(event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault()
			this.messageSendHandler()
		}
	}
	render() {
		const { messageText } = this.state
		const { style: customStyle } = this.props
		return <div style={{ ...style.main, ...customStyle }}>
			<TextareaAutosize
				style={ style.textarea }
				placeholder='Type a message...'
				value={ messageText }
				onChange={ this.onChange }
				onKeyPress={ this.keyPressHandler }
			/>
			<button style={ style.button } onClick={ this.messageSendHandler }>
				<i className="fa fa-paper-plane-o" aria-hidden="true"></i>
			</button>
		</div>
	}
}
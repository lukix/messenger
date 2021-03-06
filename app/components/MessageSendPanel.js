import React from 'react'
import SharedStyles from '../others/SharedStyles'
import TextareaAutosize from 'react-autosize-textarea'
import PropTypes from 'prop-types'

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
		background: 'none',
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
		if(this.state.messageText.trim().length > 0) {
			this.props.onMessageSend(this.state.messageText.trim())
			this.setState({ messageText: '' })
		}
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
				<i className="far fa-paper-plane"></i>
			</button>
		</div>
	}
}

MessageSendPanel.propTypes = {
	style: PropTypes.object,
	onMessageSend: PropTypes.func.isRequired,
}
MessageSendPanel.defaultProps = {
	style: {},
}
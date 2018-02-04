import React from 'react'
import Card from './Card'
import SharedStyles from '../others/SharedStyles'
import Message from './Message'
import { Scrollbars } from 'react-custom-scrollbars'
import { PulseLoader } from 'react-spinners'
import MessageSendPanel from './MessageSendPanel'
import Colors from '../others/Colors'

const style = {
	main: {},
	loadingCard: {
		opacity: 1,
		textAlign: 'center',
		fontSize: '1.5rem',
		fontWeight: 'bold',
	},
	header: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		fontWeight: 'bold',
		fontSize: '1.1rem',
	},
	conversationName: {
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
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
export default class ConversationCard extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			scrollToBottomFlag: false,
		}
		this.messageSendHandler = this.messageSendHandler.bind(this)
		this.pinStateChangeHandler = this.pinStateChangeHandler.bind(this)
	}
	componentDidMount() {
		if(this.refs.scrollbars) this.refs.scrollbars.scrollToBottom()
	}
	componentDidUpdate() {
		if(this.state.scrollToBottomFlag) {
			if(this.refs.scrollbars) this.refs.scrollbars.scrollToBottom()
			this.setState({ scrollToBottomFlag: false })
		}
	}
	messageSendHandler(message) {
		const { publicKey, keysPair } = this.props.conversation
		this.props.onMessageSend(publicKey, keysPair, message)
		this.setState({ scrollToBottomFlag: true })
	}
	pinStateChangeHandler() {
		this.props.onPinStateChange(
			this.props.conversation.publicKey,
			!this.props.conversation.pinned
		)
	}
	render() {
		const { style: customStyle, conversation } = this.props
		const { name: contactName, publicKey: contactKey, messages, pinned, 
			keysPair } = conversation
		const conversationName = contactName ? contactName : contactKey
		const pinnedStateStyle = { filter: pinned ? 'grayscale(0%)' : 'grayscale(100%)' }
		const messagesList = messages.map(
			(message, index) =>
				<Message key={ index } left={ !message.isYours } synced={ message.synced }>
					{ message.text }
				</Message>
		)
		const scrollbarProps = {
			autoHide: true,
			autoHideTimeout: 500,
			autoHeight: true,
			autoHeightMin: 100,
			autoHeightMax: 300,
		}
		const loadingCard = <Card style={{ ...style.main, ...style.loadingCard, ...customStyle }}>
			<p style={{ margin: '0 0 20px 0' }}>
				Creating keys for conversation...
			</p>
			<PulseLoader
				color={ Colors.mainDark }
				size={ 20 }
				loading={ true }
			/>
		</Card>
		const normalCard = <Card style={{ ...style.main, ...customStyle }}>
			<header style={ style.header }>
				<div style={ style.conversationName }>{ conversationName }</div>
				<div>
					<img
						src="./img/pin.png"
						alt="pin"
						style={{ ...style.pin, ...pinnedStateStyle }}
						onClick={ this.pinStateChangeHandler }
					/>
				</div>
			</header>
			<div style={ style.conversationBox }>
				<Scrollbars {...scrollbarProps} ref="scrollbars">
					<div style={ style.scrollArea }>
						{ messagesList }
					</div>
				</Scrollbars>
			</div>
			<MessageSendPanel onMessageSend={ this.messageSendHandler } />
		</Card>
		return keysPair === null ? loadingCard : normalCard
	}
}
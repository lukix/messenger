import React from 'react'
import { css, keyframes } from 'react-emotion'
import Card from './Card'
import SharedStyles from '../others/SharedStyles'
import Message from './Message'
import { Scrollbars } from 'react-custom-scrollbars'
import { PulseLoader } from 'react-spinners'
import MessageSendPanel from './MessageSendPanel'
import Colors from '../others/Colors'

const flashAnimation = keyframes`
	from {
		outline-color: transparent
		background-color: white
	}
	50% {
		outline-color: ${ Colors.mainDark }
		background-color: #F2F0F4
	}
	to {
		outline-color: transparent
		background-color: white
	}
`
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
		width: '100%',
		cursor: 'pointer',
	},
	conversationNameEditBox: {
		width: '100%',
		background: 'transparent',
		border: '1px solid #999',
		fontSize: '1rem',
		padding: '4px',
	},
	pin: {
		height: '24px',
		cursor: 'pointer',
		marginLeft: '5px',
	},
	conversationBox: {
		...SharedStyles.textFields,
		margin: '10px 0',
	},
	scrollArea: {
		padding: '10px',
	},
	conversationOptions: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		color: Colors.mainDark,
		fontSize: '1.4rem',
		marginLeft: '10px',
	},
}
const animationClass = css`
	outline: 3px solid transparent
	animation: ${ flashAnimation } 0.6s ease infinite;
`
const transformNewlinesToJSX = (str) => str.split('\n').map(
	(item, key) => <span key={key}>{item}<br/></span>
)
export default class ConversationCard extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			scrollToBottomFlag: false,
			nameEditMode: false,
			newConversationName: this.props.conversation.name,
			useAnimationClass: false,
			flashAnimationTimer: null,
		}
		this.messageSendHandler = this.messageSendHandler.bind(this)
		this.pinStateChangeHandler = this.pinStateChangeHandler.bind(this)
		this.toggleEditMode = this.toggleEditMode.bind(this)
		this.editNameKeyPressHandler = this.editNameKeyPressHandler.bind(this)
		this.editNameChangeHandler = this.editNameChangeHandler.bind(this)
		this.onMessageRemove = this.onMessageRemove.bind(this)
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
	componentWillReceiveProps(newProps) {
		if(newProps.conversation.messages.length > this.props.conversation.messages.length) {
			this.setState({ scrollToBottomFlag: true })
		}
		if(newProps.conversation.animationId !== this.props.conversation.animationId) {
			clearTimeout(this.state.flashAnimationTimer)
			this.setState({ useAnimationClass: false }, () => {
				setTimeout(() => { this.setState({ useAnimationClass: true }) }, 0)
				const flashAnimationTimer = setTimeout(() => {
					this.setState({ useAnimationClass: false })
				}, 1200)
				this.setState({ flashAnimationTimer })
			})
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
	toggleEditMode() {
		this.setState({ nameEditMode: !this.state.nameEditMode })
		if(this.state.nameEditMode) {
			this.setState({ newConversationName: this.props.conversation.name })
		}
	}
	editNameKeyPressHandler(event) {
		if(event.key === 'Enter') {
			this.toggleEditMode()
			this.props.onConversationNameChange(
				this.props.conversation.publicKey,
				this.state.newConversationName
			)
		}
	}
	editNameChangeHandler(event) {
		this.setState({ newConversationName: event.target.value })
	}
	onMessageRemove(id) {
		return () => this.props.removeMessage(this.props.conversation.publicKey, id)
	}
	onMessageResend(messageId, messageContent) {
		return () => this.props.resendMessage(
			this.props.conversation.publicKey,
			this.props.conversation.keysPair,
			messageContent,
			messageId
		)
	}
	render() {
		const { nameEditMode, useAnimationClass } = this.state
		const { style: customStyle, conversation } = this.props
		const { name: contactName, publicKey: contactKey, messages, pinned, 
			keysPair } = conversation
		const conversationName = contactName ? contactName : contactKey
		const pinnedStateStyle = {
			filter: pinned
				? 'grayscale(0%) brightness(0.5) saturate(3)'
				: 'grayscale(100%)',
		}
		const messagesList = messages.map(
			(message, index) =>
				<Message
					key={ index }
					left={ !message.isYours }
					synced={ message.synced }
					error={ message.error }
					removeMessage={ this.onMessageRemove(message.id) }
					resendMessage={ this.onMessageResend(message.id, message.text) }
				>
					{ transformNewlinesToJSX(message.text) }
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
		const normalCard = <Card
			style={{ ...style.main, ...customStyle }}
			className={ useAnimationClass ? animationClass : '' }
		>
			<header style={ style.header }>
				{
					nameEditMode
						? <input
							type="text"
							style={ style.conversationNameEditBox }
							placeholder="Conversation name"
							defaultValue={ contactName }
							onChange={ this.editNameChangeHandler }
							onBlur={ this.toggleEditMode }
							onKeyPress={ this.editNameKeyPressHandler }
							autoFocus
						/>
						: <div style={ style.conversationName } onClick={ this.toggleEditMode }>
							{ conversationName }
						</div>
				}
				
				<div style={ style.conversationOptions }>
					<img
						src="./img/pin.png"
						alt="Pin conversation"
						title="Pin conversation"
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
import { connect } from 'react-redux'
import ConversationsList from './../components/ConversationsList'
import { sendMessageAction, removeMessage } from '../actions/messagesActions'
import { changePinStateAction, changeConversationName } from '../actions/conversationsActions'

const mapStateToProps = (state, ownProps) => {
	return {
		...ownProps,
		unpinnedConversations: state.conversations.filter((conversation) => !conversation.pinned),
		pinnedConversations: state.conversations.filter((conversation) => conversation.pinned),
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onMessageSend: (publicKey, keysPair, message) => {
			dispatch(sendMessageAction(publicKey, keysPair, message))
		},
		removeMessage: (publicKey, messageId) => {
			dispatch(removeMessage(publicKey, messageId))
		},
		resendMessage: (publicKey, keysPair, messageContent, messageId) => {
			dispatch(removeMessage(publicKey, messageId))
			dispatch(sendMessageAction(publicKey, keysPair, messageContent))
		},
		onPinStateChange: (publicKey, pinned) => {
			dispatch(changePinStateAction(publicKey, pinned, new Date()))
		},
		onConversationNameChange: (publicKey, newName) => {
			dispatch(changeConversationName(publicKey, newName))
		},
	}
}

const ConversationsListContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(ConversationsList)

export default ConversationsListContainer
import { connect } from 'react-redux'
import ConversationsList from './../components/ConversationsList'
import { sendMessageAction, changePinStateAction } from '../actions/index'

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
		onPinStateChange: (publicKey, pinned) => {
			dispatch(changePinStateAction(publicKey, pinned))
		},
	}
}

const ConversationsListContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(ConversationsList)

export default ConversationsListContainer
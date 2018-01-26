import { connect } from 'react-redux'
import ConversationsList from './../components/ConversationsList'
import { sendMessageAction } from '../actions/index'

const mapStateToProps = (state, ownProps) => {
	return {
		...ownProps,
		conversations: state.conversations,
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onMessageSend: (publicKey, message) => {
			dispatch(sendMessageAction(publicKey, message))
		},
	}
}

const ConversationsListContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(ConversationsList)

export default ConversationsListContainer
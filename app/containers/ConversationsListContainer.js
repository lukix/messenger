import { connect } from 'react-redux'
import ConversationsList from './../components/ConversationsList'

const mapStateToProps = (state, ownProps) => {
	return {
		...ownProps,
		conversations: state.conversations,
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {}
}

const ConversationsListContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(ConversationsList)

export default ConversationsListContainer
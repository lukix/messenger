import { connect } from 'react-redux'
import SearchCard from './../components/SearchCard'
import { addConversationAndSendMessageAction, changePinStateAction } from '../actions/index'

const extractContacts = function (conversations) {
	return conversations.map(function convertConversationToContact({ name, publicKey }) {
		return { name, publicKey }
	})
}
const mapStateToProps = (state, ownProps) => {
	return {
		...ownProps,
		contacts: extractContacts(state.conversations),
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onMessageSend: (publicKey, message) => {
			dispatch(addConversationAndSendMessageAction(publicKey, message))
		},
		onPinStateChange: (publicKey, pinned) => {
			dispatch(changePinStateAction(publicKey, pinned))
		},
	}
}

const SearchCardContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchCard)

export default SearchCardContainer
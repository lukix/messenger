import { connect } from 'react-redux'
import SearchCard from './../components/SearchCard'
import {
	changePinStateAction,
	addConversationAction,
	fireFlashAnimation,
} from '../actions/conversationsActions'
import { sendMessageAction } from '../actions/messagesActions'

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
			dispatch(addConversationAction(publicKey)).then(keysPair => {
				dispatch(sendMessageAction(publicKey, keysPair, message))
			})
		},
		onPinStateChange: (publicKey, pinned) => {
			dispatch(changePinStateAction(publicKey, pinned))
			dispatch(fireFlashAnimation(publicKey, Math.random()))
		},
	}
}

const SearchCardContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchCard)

export default SearchCardContainer
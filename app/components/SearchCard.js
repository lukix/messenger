import React from 'react'
import Card from './Card'
import SharedStyles from '../others/SharedStyles'
import MatchingContacts from './searchResults/MatchingContacts'
import NewConversation from './searchResults/NewConversation'
import AutosuggestConversationInput from './AutosuggestConversationInput'

const style = {
	main: {},
	searchPanel: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'spaceBetween',
	},
	button: {
		...SharedStyles.button,
		minWidth: '40px',
	},
	autosuggestWrapper: {
		flex: '1',
		margin: '0 6px',
	},
	searchResults: {
		fontSize: '1.1rem',
		marginTop: '15px',
	},
}

export default class SearchCard extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			searchResult: null,
		}
		
		this.messageSendHandler = this.messageSendHandler.bind(this)
		this.onSearchButtonClick = this.onSearchButtonClick.bind(this)
		this.pinConversation = this.pinConversation.bind(this)
		this.search = this.search.bind(this)
	}
	pinConversation(publicKey) {
		this.resetSearchResults()
		this.props.onPinStateChange(publicKey, false)
		this.props.onPinStateChange(publicKey, true)
	}
	resetSearchResults() {
		this.setState({ searchResult: null, value: '' })
	}
	messageSendHandler(publicKey, message) {
		this.resetSearchResults()
		this.props.onMessageSend(publicKey, message)
	}
	onSearchButtonClick() {
		this.search(this.state.value)
	}
	search(searchText) {
		const isValidKey = searchText.length === 392
		if(isValidKey) {
			const isExistingContact = this.props.contacts
				.map(({ publicKey }) => publicKey)
				.includes(searchText)
			if(isExistingContact) {
				this.pinConversation(searchText)
			} else {
				this.setState({
					searchResult: { newConversationKey: searchText },
				})
			}
		} else {
			const matchingContacts = this.props.contacts.filter(function hasSameBegining(contact) {
				const str1 = contact.name.substr(0, searchText.length).toLowerCase()
				const str2 = searchText.toLowerCase()
				return str1 === str2
			})
			const exactResult = matchingContacts.find(contact => contact.name === searchText)
			if(exactResult !== undefined) {
				this.pinConversation(exactResult.publicKey)
			} else {
				this.setState({
					searchResult: { contacts: matchingContacts, searchText },
				})
			}
		}
	}
	render() {
		const { searchResult } = this.state
		const { style: customStyle, contacts } = this.props
		const resultElement = searchResult === null
			? ''
			: searchResult.contacts !== undefined
				?	<MatchingContacts
					contacts={ searchResult.contacts }
					searchText={ searchResult.searchText }
					style={ style.searchResults }
					pinConversation={ this.pinConversation }
				/>
				: <NewConversation
					publicKey={ searchResult.newConversationKey }
					style={ style.searchResults }
					onMessageSend={ this.messageSendHandler }
				/>
		return <Card style={{ ...style.main, ...customStyle }}>
			<div style={ style.searchPanel }>
				{ /*
				<button style={ style.button }>
					<i className="fas fa-user"></i>
				</button>
				*/ }
				<div style={ style.autosuggestWrapper }>
					<AutosuggestConversationInput {...{ contacts, search: this.search }} />
				</div>
				<button style={ style.button } onClick={ this.onSearchButtonClick }>
					<i className="fas fa-search"></i>
				</button>
			</div>
			{ resultElement }
		</Card>
	}
}
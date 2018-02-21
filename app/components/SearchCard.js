import React from 'react'
import Card from './Card'
import Autosuggest from 'react-autosuggest'
import SharedStyles from '../others/SharedStyles'
import MatchingContacts from './searchResults/MatchingContacts'
import NewConversation from './searchResults/NewConversation'

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
const getSuggestionValue = suggestion => suggestion
const renderSuggestion = suggestion => <div>{suggestion}</div>
const getSuggestions = (value, contacts) => {
	const inputValue = value.trim().toLowerCase()
	const inputLength = inputValue.length
	return inputLength === 0 ? [] : contacts.map(contact => contact.name).filter(contact =>
		contact.toLowerCase().slice(0, inputLength) === inputValue
	)
}
export default class SearchCard extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			value: '',
			suggestions: [],
			searchResult: null,
		}
		this.search = this.search.bind(this)
		this.messageSendHandler = this.messageSendHandler.bind(this)
		this.onChange = this.onChange.bind(this)
		this.onKeyPress = this.onKeyPress.bind(this)
		this.onSearchButtonClick = this.onSearchButtonClick.bind(this)
		this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this)
		this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this)
		this.pinConversation = this.pinConversation.bind(this)
	}
	pinConversation(publicKey) {
		this.resetSearchResults()
		this.props.onPinStateChange(publicKey, false)
		this.props.onPinStateChange(publicKey, true)
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
	resetSearchResults() {
		this.setState({ searchResult: null, value: '' })
	}
	messageSendHandler(publicKey, message) {
		this.resetSearchResults()
		this.props.onMessageSend(publicKey, message)
	}
	onChange(event, { newValue }) {
		this.setState({
			value: newValue,
		})
	}
	onKeyPress(event) {
		if(event.key === 'Enter') {
			this.search(this.state.value)
		}
	}
	onSearchButtonClick() {
		this.search(this.state.value)
	}
	onSuggestionsFetchRequested({ value }) {
		const { contacts } = this.props
		this.setState({
			suggestions: getSuggestions(value, contacts),
		})
	}
	onSuggestionsClearRequested() {
		this.setState({
			suggestions: [],
		})
	}
	render() {
		const { value, suggestions, searchResult } = this.state
		const { style: customStyle } = this.props
		const inputProps = {
			placeholder: 'Type public key or name',
			value,
			onChange: this.onChange,
			onKeyPress: this.onKeyPress,
		}
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
					<Autosuggest
						suggestions={suggestions}
						onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
						onSuggestionsClearRequested={this.onSuggestionsClearRequested}
						getSuggestionValue={getSuggestionValue}
						renderSuggestion={renderSuggestion}
						inputProps={inputProps}
					/>
				</div>
				<button style={ style.button } onClick={ this.onSearchButtonClick }>
					<i className="fas fa-search"></i>
				</button>
			</div>
			{ resultElement }
		</Card>
	}
}
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
			customStyle: props.style,
			value: '',
			suggestions: [],
			contacts: props.contacts,
			searchResult: null,
			onMessageSend: props.onMessageSend,
		}
		this.search = this.search.bind(this)
		this.messageSendHandler = this.messageSendHandler.bind(this)
		this.onChange = this.onChange.bind(this)
		this.onKeyPress = this.onKeyPress.bind(this)
		this.onSearchButtonClick = this.onSearchButtonClick.bind(this)
		this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this)
		this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this)
	}
	search(searchText) {
		const isValidKey = searchText.length === 26
		if(isValidKey) {
			const isExistingContact = this.state.contacts
				.map(({ publicKey }) => publicKey)
				.includes(searchText)
			if(isExistingContact) {
				//TODO: Pin found conversation
				console.log('Pin found conversation')
			} else {
				this.setState({
					searchResult: { newConversationKey: searchText },
				})
			}
		} else {
			const matchingContacts = this.state.contacts.filter(function hasSameBegining(contact) {
				return contact.name.substr(0, searchText.length) === searchText
			})
			const foundExactResult = matchingContacts.some(contact => contact.name === searchText)
			if(foundExactResult) {
				//TODO: Pin found conversation
				console.log('Pin found conversation')
			} else {
				this.setState({
					searchResult: { contacts: matchingContacts, searchText },
				})
			}
		}
	}
	messageSendHandler(publicKey, message) {
		this.setState({ searchResult: null })
		this.state.onMessageSend(publicKey, message)
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
		const { contacts } = this.state
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
		const { customStyle, value, suggestions, searchResult } = this.state
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
				/>
				: <NewConversation
					publicKey={ searchResult.newConversationKey }
					style={ style.searchResults }
					onMessageSend={ this.messageSendHandler }
				/>
		return <Card style={{ ...style.main, ...customStyle }}>
			<div style={ style.searchPanel }>
				<button style={ style.button }>
					<i className="fa fa-address-book-o" aria-hidden="true"></i>
				</button>
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
					<i className="fa fa-search" aria-hidden="true"></i>
				</button>
			</div>
			{ resultElement }
		</Card>
	}
}
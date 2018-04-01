import React from 'react'
import Card from './Card'
import SharedStyles from '../others/SharedStyles'
import MatchingContacts from './searchResults/MatchingContacts'
import NewConversation from './searchResults/NewConversation'
import AutosuggestConversationInput from './AutosuggestConversationInput'
import axios from '../others/axiosInstance'

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
const matchesKeyFormat = (searchText) => searchText.length === 392
const contactExists = (key, contacts) => (
	contacts
		.map(({ publicKey }) => publicKey)
		.includes(key)
)
const findMatchingContacts = (searchText, contacts) => (
	contacts
		.filter(function hasSameBegining(contact) {
			const contactBegining = contact.name.substr(0, searchText.length)
			return contactBegining.toLowerCase() === searchText.toLowerCase()
		})
)
export default class SearchCard extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			searchText: '',
			searchResult: null,
			isFromSharedUrl: false,
		}

		this.messageSendHandler = this.messageSendHandler.bind(this)
		this.onSearchButtonClick = this.onSearchButtonClick.bind(this)
		this.pinConversation = this.pinConversation.bind(this)
		this.search = this.search.bind(this)
		this.onSearchTextChange = this.onSearchTextChange.bind(this)
	}
	componentDidMount() {
		const { shareId } = this.props
		if(shareId) {
			axios.get(`/publicKeys/${shareId}`)
				.then(({ data }) => {
					this.state.searchText = `Shared URL: /${shareId}`
					this.search(data.publicKey)
					this.setState({ isFromSharedUrl: true })
				})
				.catch((err) => {
					//TODO
					console.log(err)
				})
		}
	}
	pinConversation(publicKey) {
		this.resetSearchResults()
		this.props.onPinStateChange(publicKey, false)
		this.props.onPinStateChange(publicKey, true)
	}
	resetSearchResults() {
		this.setState({ searchResult: null, searchText: '' })
	}
	messageSendHandler(publicKey, message) {
		this.resetSearchResults()
		this.props.onMessageSend(publicKey, message)
	}
	onSearchButtonClick() {
		this.search(this.state.searchText)
	}
	onSearchTextChange(event, { newValue }) {
		this.setState({ searchText: newValue })
	}
	search(searchText) {
		this.setState({ isFromSharedUrl: false })
		if (searchText.trim() === '') {
			this.resetSearchResults()
			return
		}
		if (matchesKeyFormat(searchText)) {
			contactExists(searchText, this.props.contacts)
				? this.pinConversation(searchText)
				: this.setState({ searchResult: { newConversationKey: searchText } })
		} else {
			const matchingResults = findMatchingContacts(searchText, this.props.contacts)
			const exactResult = matchingResults.find(contact => contact.name === searchText)
			if (exactResult !== undefined) {
				this.pinConversation(exactResult.publicKey)
			} else {
				this.setState({
					searchResult: { contacts: matchingResults, searchText },
				})
			}
		}
	}
	render() {
		const { searchText, searchResult, isFromSharedUrl } = this.state
		const { style: customStyle, contacts } = this.props
		const resultElement = searchResult === null
			? ''
			: searchResult.contacts !== undefined
				? <MatchingContacts
					contacts={searchResult.contacts}
					searchText={searchResult.searchText}
					style={style.searchResults}
					pinConversation={this.pinConversation}
				/>
				: <NewConversation
					publicKey={searchResult.newConversationKey}
					style={style.searchResults}
					onMessageSend={this.messageSendHandler}
					customText={
						isFromSharedUrl
							? `	Someone has invited you to start a conversation
									by sharing this URL with you. Say hello:`
							: undefined
					}
				/>
		return <Card style={{ ...style.main, ...customStyle }}>
			<div style={style.searchPanel}>
				<div style={style.autosuggestWrapper}>
					<AutosuggestConversationInput {...{
						contacts,
						search: this.search,
						onChange: this.onSearchTextChange,
						value: searchText,
						placeholder: 'Type public key or name',
					}} />
				</div>
				<button style={style.button} onClick={this.onSearchButtonClick}>
					<i className="fas fa-search"></i>
				</button>
			</div>
			{resultElement}
		</Card>
	}
}
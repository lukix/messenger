import React from 'react'
import Autosuggest from 'react-autosuggest'

const getSuggestionValue = suggestion => suggestion
const renderSuggestion = suggestion => <div>{suggestion}</div>
const getSuggestions = (value, contacts) => {
	const inputValue = value.trim().toLowerCase()
	const inputLength = inputValue.length
	return inputLength === 0 ? [] : contacts.map(contact => contact.name).filter(contact =>
		contact.toLowerCase().slice(0, inputLength) === inputValue
	)
}
export default class AutosuggestConversationInput extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			value: '',
			suggestions: [],
		}
		this.onChange = this.onChange.bind(this)
		this.onKeyPress = this.onKeyPress.bind(this)
		this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this)
		this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this)
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
	onChange(event, { newValue }) {
		this.setState({
			value: newValue,
		})
	}
	onKeyPress(event) {
		if(event.key === 'Enter') {
			this.props.search(this.state.value)
		}
	}
	render() {
		const { value, suggestions } = this.state
		const inputProps = {
			placeholder: 'Type public key or name',
			value,
			onChange: this.onChange,
			onKeyPress: this.onKeyPress,
		}
		return <Autosuggest
			suggestions={suggestions}
			onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
			onSuggestionsClearRequested={this.onSuggestionsClearRequested}
			getSuggestionValue={getSuggestionValue}
			renderSuggestion={renderSuggestion}
			inputProps={inputProps}
		/>
	}
}
import React from 'react'
import Autosuggest from 'react-autosuggest'
import PropTypes from 'prop-types'

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
			suggestions: [],
		}
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
	onKeyPress(event) {
		if(event.key === 'Enter') {
			this.props.search(this.props.value)
		}
	}
	render() {
		const { suggestions } = this.state
		const inputProps = {
			placeholder: this.props.placeholder,
			value: this.props.value,
			onChange: this.props.onChange,
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

AutosuggestConversationInput.propTypes = {
	contacts: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })),
	search: PropTypes.func.isRequired,
	value: PropTypes.string,
	onChange: PropTypes.func,
	placeholder: PropTypes.string,
}
AutosuggestConversationInput.defaultProps = {
	style: {},
}
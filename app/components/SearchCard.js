import React from 'react'
import Card from './Card'
import Autosuggest from 'react-autosuggest'
import Colors from '../others/Colors'

const style = {
	main: {
		
	},
	content: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'spaceBetween',
	},
	button: {
		background: Colors.mainDark,
		display: 'block',
		border: 'none',
		fontSize: '24px',
		color: 'white',
		padding: '0 8px',
		cursor: 'pointer',
		height: '40px',
		borderRadius: '4px',
	},
}
const contacts = [
	'Elon Musk',
	'Ludovico Einaudi',
	'Roger Federer',
	'Rafael Nadal',
	'Peter Beck',
]
const getSuggestionValue = suggestion => suggestion
const renderSuggestion = suggestion => <div>{suggestion}</div>
const getSuggestions = value => {
	const inputValue = value.trim().toLowerCase()
	const inputLength = inputValue.length
	return inputLength === 0 ? [] : contacts.filter(contact =>
		contact.toLowerCase().slice(0, inputLength) === inputValue
	)
}
export default class SearchCard extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			customStyle: props.customStyle,
			value: '',
			suggestions: [],
		}
		this.onChange = this.onChange.bind(this)
		this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this)
		this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this)
	}
	onChange(event, { newValue }) {
		this.setState({
			value: newValue,
		})
	}
	onSuggestionsFetchRequested({ value }) {
		this.setState({
			suggestions: getSuggestions(value),
		})
	}
	onSuggestionsClearRequested() {
		this.setState({
			suggestions: [],
		})
	}
	render() {
		const { customStyle, value, suggestions } = this.state
		const inputProps = {
			placeholder: 'Type public key or name',
			value,
			onChange: this.onChange,
		}
		return <Card style={{ ...style.main, ...customStyle }}>
			<div style={ style.content }>
				<button style={ style.button }>
					<i className="fa fa-address-book-o" aria-hidden="true"></i>
				</button>
				<div style={{ flex: '1', margin: '0 6px' }}>
					<Autosuggest
						suggestions={suggestions}
						onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
						onSuggestionsClearRequested={this.onSuggestionsClearRequested}
						getSuggestionValue={getSuggestionValue}
						renderSuggestion={renderSuggestion}
						inputProps={inputProps}
					/>
				</div>
				<button style={ style.button }>
					<i className="fa fa-search" aria-hidden="true"></i>
				</button>
			</div>
		</Card>
	}
}
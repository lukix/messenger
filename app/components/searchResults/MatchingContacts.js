import React from 'react'

const style = {
	main: {
		
	},
	resultText: {
		fontWeight: 'bold',
	},
	listItem: {
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		cursor: 'pointer',
	},
}
const contactToString = ({ name, publicKey }) => `${name} (${publicKey})`
export default function MatchingContacts({
	style: customStyle,
	contacts,
	searchText,
	pinConversation,
}) {
	const contactListElements = contacts.map((contact, index) =>
		<li key={index} style={ style.listItem } onClick={() => pinConversation(contact.publicKey)}>
			{ contactToString(contact) }
		</li>
	)
	const listDisplayMode = contacts.length > 0 ? 'block' : 'none'
	const resultText = contacts.length > 0
		? `Search results for "${searchText}"`
		: `"${searchText}" does not match any of your contacts and it is not a valid key.`
	return <div style={{ ...style.main, ...customStyle }}>
		<p style={ style.resultText }> { resultText } </p>
		<ul style={{ display: listDisplayMode }}>
			{ contactListElements }
		</ul>
	</div>
}
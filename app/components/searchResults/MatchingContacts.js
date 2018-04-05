import React from 'react'
import { css } from 'emotion'

const mainClass = css`
	& .resultText {
		font-weight: bold;
	}
	& .listItem {
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		cursor: pointer;
		&:hover {
			text-decoration: underline;
		}
	}
`
const contactToString = ({ name, publicKey }) => `${name} (${publicKey})`
export default function MatchingContacts({
	style: customStyle,
	contacts,
	searchText,
	pinConversation,
}) {
	const contactListElements = contacts.map((contact, index) =>
		<li
			key={index}
			className="listItem"
			onClick={() => pinConversation(contact.publicKey)}
		>
			{ contactToString(contact) }
		</li>
	)
	const listDisplayMode = contacts.length > 0 ? 'block' : 'none'
	const resultText = contacts.length > 0
		? `Search results for "${searchText}"`
		: `"${searchText}" does not match any of your contacts and it is not a valid key.`
	return <div className={ mainClass } style={ customStyle }>
		<p className="resultText"> { resultText } </p>
		<ul style={{ display: listDisplayMode }}>
			{ contactListElements }
		</ul>
	</div>
}
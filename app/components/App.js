import React from 'react'
import Colors from '../others/Colors'
import MenuBar from './MenuBar'
import SearchCard from './SearchCard'
import ConversationCard from './ConversationCard'

const style = {
	main: {
		background: `
			linear-gradient(
				to bottom,
				transparent 0%,
				transparent 400px,
				${Colors.mainLight} 400px,
				${Colors.mainLight} 100%
			),
			url("./img/pattern.png"),
			${Colors.mainDark}
		`,
		minHeight: '100%',
		textAlign: 'center',
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
		overflow: 'hidden',
	},
	title: {
		fontFamily: '"OpenSans"',
		color: Colors.textLight,
		fontSize: '5rem',
		fontWeight: 'normal',
		backgroundColor: Colors.mainDark,
		display: 'inline-block',
		padding: '0px 40px 10px 40px',
		margin: '50px 0 20px 0',
		height: '90px',
		lineHeight: '90px',
	},
}

//sampleConversations is temporary (for testing purposes)
const sampleConversations = [
	{
		publicKey: 'lY81Y6Ib8f36myPce4nT3mA424',
		name: 'Roger Federer',
		messages: [
			{ text: 'Aliquam libero nunc', date: new Date('2018-01-23 19:54:50'), isYours: false },
			{ text: 'mattis pretium nisi!', date: new Date('2018-01-23 19:55:36'), isYours: true },
			{ text: 'pharetra lacinia', date: new Date('2018-01-23 19:55:44'), isYours: false },
			{ text: 'dui sed', date: new Date('2018-01-23 19:56:46'), isYours: true },
			{ text: 'ultricies', date: new Date('2018-01-23 19:57:23'), isYours: true },
			{ text: 'Nam ac laoreet arcu.', date: new Date('2018-01-23 19:59:46'), isYours: false },
			{ text: 'nulla vulputate dolor', date: new Date('2018-01-23 19:59:48'), isYours: true },
			{ text: 'Vestibulum an primis', date: new Date('2018-01-23 20:00:41'), isYours: true },
			{ text: 'rutrum ', date: new Date('2018-01-23 20:01:13'), isYours: false },
		],
		pinned: false,
	},
	{
		publicKey: 'MoPqoCtdmiKtocKm9Is1ILjvZN',
		name: '',
		messages: [
			{ text: 'Hi!', date: new Date('2018-01-22 20:21:48'), isYours: false },
			{ text: 'Hullo', date: new Date('2018-01-22 20:23:24'), isYours: true },
			{ text: 'Whats up', date: new Date('2018-01-22 20:23:32'), isYours: true },
			{ text: 'Nothing. Bye.', date: new Date('2018-01-22 20:25:17'), isYours: false },
		],
		pinned: true,
	},
]
const extractContacts = function (conversations) {
	return conversations.map(function convertConversationToContact({ name, publicKey }) {
		return { name, publicKey }
	})
}

export default function App() {
	const conversations = sampleConversations
	const contacts = extractContacts(conversations)
	const cardWidth = '600px'
	const cardMaxWidth = 'calc(100% - 60px)'
	const conversationsList = conversations.map(
		(conversation, index) =>
			<ConversationCard
				key={ index }
				style={{ width: cardWidth, maxWidth: cardMaxWidth }}
				conversation={ conversation }
				onMessageSend={ () => {} }
			/>
	)
	return <div style={ style.main }>
		<MenuBar menuItems={[ 'My Keys', 'Contacts', 'Settings' ]} />
		<h1 style={ style.title }>Messenger</h1>
		<SearchCard style={{ width: cardWidth, maxWidth: cardMaxWidth }} contacts={contacts} />
		{ conversationsList }
	</div>
}
import React from 'react'
import Colors from '../others/Colors'
import MenuBar from './MenuBar'
import Card from './Card'
import SearchCard from './SearchCard'

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
		width: '100vw',
		minHeight: '100%',
		textAlign: 'center',
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

export default function App() {
	return <div style={ style.main }>
		<MenuBar menuItems={[ 'My Keys', 'Contacts', 'Settings' ]} />
		<h1 style={ style.title }>Messenger</h1>
		<SearchCard />
		<Card>Lorem ipsum dolor</Card>
	</div>
}
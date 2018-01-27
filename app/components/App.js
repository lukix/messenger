import React from 'react'
import MediaQuery from 'react-responsive'
import Colors from '../others/Colors'
import MenuBarContainer from '../containers/MenuBarContainer'
import SearchCardContainer from '../containers/SearchCardContainer'
import ConversationsListContainer from '../containers/ConversationsListContainer'

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
	const cardWidth = '600px'
	const cardMaxWidth = 'calc(100% - 60px)'
	const titleStyles = (matches) => ({
		...style.title,
		...(matches ? {} : { margin: '20px 0 15px 0' } ),
		fontSize: matches ? '5rem' : '3.5rem',
	})
	return <div style={ style.main }>
		<MenuBarContainer />
		<MediaQuery minDeviceWidth={500}>
			{ (matches) => <h1 style={ titleStyles(matches) }>Messenger</h1> }
		</MediaQuery>

		<SearchCardContainer style={{ width: cardWidth, maxWidth: cardMaxWidth }} />
		<ConversationsListContainer cardStyle={{ width: cardWidth, maxWidth: cardMaxWidth }} />
	</div>
}
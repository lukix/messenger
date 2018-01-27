import React from 'react'
import SharedStyles from '../../others/SharedStyles'

const style = {
	main: {},
	list: {
		fontSize: '1.1rem',
		margin: 0,
		padding: '0 0 0 20px',
		listStyleType: 'circle',
	},
	publicKey: {
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
	},
	button: {
		...SharedStyles.button,
		background: 'white',
		color: 'black',
		fontSize: '1.2rem',
		display: 'inline-block',
		width: '100%',
	},
}
export default function KeysBox({ style: customStyle, keys }) {
	const listItems = keys.map(
		(pair, index) => <li key={index}>
			<div style={ style.publicKey }>{ pair.publicKey }</div>
		</li>
	)
	const keysList = <div>
		<p style={{ margin: '20px 0 10px 0' }}>Your Keys:</p>
		<ul style={ style.list }>
			{ listItems }
		</ul>
	</div>
	return <div style={{ ...style.main, ...customStyle }}>
		<div style={{ textAlign: 'center' }}>
			<button style={ style.button }>
				{ 'Request a new key' }
			</button>
		</div>
		{ keys.length > 0 ? keysList : '' }
	</div>
}
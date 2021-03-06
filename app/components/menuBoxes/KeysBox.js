import React from 'react'
import SharedStyles from '../../others/SharedStyles'
import { PulseLoader } from 'react-spinners'
import Colors from '../../others/Colors'
import KeysListItem from './KeysListItem'

const style = {
	main: {},
	list: {
		fontSize: '1.1rem',
		margin: 0,
		padding: '0 0 0 20px',
		listStyleType: 'circle',
	},
	publicKey: {
		marginBottom: '6px',
	},
	button: {
		...SharedStyles.button,
		...SharedStyles.menuBoxButton,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	buttonLabel: {
		textAlign: 'center',
		position: 'absolute',
		left: 0,
		right: 0,
	},
	keyInputText: {
		width: '100%',
		background: 'transparent',
		border: 'none',
		color: 'white',
		margin: '1px 0',
	},
}
export default function KeysBox({ style: customStyle, keys, createNewKey, keyRequestInProgress }) {
	const cursorType = keyRequestInProgress ? 'not-allowed' : 'pointer'
	const listItems = keys.map(
		(pair, index) => <li key={index}>
			<KeysListItem
				publicKey={pair.publicKey}
				createdDate={pair.created}
			/>
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
			<button
				style={{ ...style.button, cursor: cursorType }}
				onClick={ createNewKey }
				disabled={ keyRequestInProgress }
			>
				<div style={ style.buttonLabel }>{ 'Request a new key' }</div>
				<PulseLoader
					color={ Colors.mainDark }
					size={ 12 }
					loading={ keyRequestInProgress }
				/>
			</button>
		</div>
		{ keys.length > 0 ? keysList : '' }
	</div>
}
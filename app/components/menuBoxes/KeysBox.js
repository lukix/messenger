import React from 'react'
import SharedStyles from '../../others/SharedStyles'
import { PulseLoader } from 'react-spinners'
import Colors from '../../others/Colors'

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
		display: 'flex',
		width: '100%',
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
}
const transformPEMtoKeyString = (pemString) => pemString.split('\n').slice(1, -1).join('')
export default function KeysBox({ style: customStyle, keys, createNewKey, keyRequestInProgress }) {
	const cursorType = keyRequestInProgress ? 'not-allowed' : 'pointer'
	const listItems = keys.map(
		(pair, index) => <li key={index}>
			<div style={ style.publicKey }>{ transformPEMtoKeyString(pair.publicKey) }</div>
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
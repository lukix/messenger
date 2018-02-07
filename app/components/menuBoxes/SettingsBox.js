import React from 'react'
import SharedStyles from '../../others/SharedStyles'

const style = {
	main: {},
	button: {
		...SharedStyles.button,
		background: 'white',
		color: 'black',
		fontSize: '1.2rem',
		width: '100%',
		textAlign: 'center',
	},
}
export default function SettingsBox({ style: customStyle, wipeAppData }) {
	return <div style={{ ...style.main, ...customStyle }}>
		<button
			style={{ ...style.button }}
			onClick={ wipeAppData }
		>
			Wipe all app data
		</button>
	</div>
}
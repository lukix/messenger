import React from 'react'
import moment from 'moment'
import SharedStyles from '../../others/SharedStyles'

const style = {
	publicKey: {
		marginBottom: '10px',
	},
	keyInputText: {
		width: '100%',
		background: 'transparent',
		border: 'none',
		color: 'white',
		margin: '1px 0',
	},
	shareButton: {
		...SharedStyles.button,
		background: 'white',
		color: 'black',
		height: '22px',
		fontSize: '1rem',
	},
	topBar: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
}
const selectTarget = (event) => event.target.select()
export default function KeysBox({ publicKey, createdDate }) {
	const dateString = moment(createdDate).format('MMM Do, HH:mm:ss')
	return <div style={style.publicKey}>
		<div style={style.topBar}>
			<span>{dateString}</span>
			<button style={style.shareButton}><i className="fas fa-link"></i> Share URL</button>
		</div>
		<input
			type="text"
			style={style.keyInputText}
			value={publicKey}
			onFocus={selectTarget}
			readOnly
		/>
	</div>
}
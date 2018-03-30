import React from 'react'
import moment from 'moment'

const style = {
	publicKey: {
		marginBottom: '6px',
	},
	keyInputText: {
		width: '100%',
		background: 'transparent',
		border: 'none',
		color: 'white',
		margin: '1px 0',
	},
}
const selectTarget = (event) => event.target.select()
export default function KeysBox({ publicKey, createdDate }) {
	const dateString = moment(createdDate).format('MMM Do, HH:mm:ss')
	return <div style={style.publicKey}>
		<div>{dateString}</div>
		<input
			type="text"
			style={style.keyInputText}
			value={publicKey}
			onFocus={selectTarget}
			readOnly
		/>
	</div>
}
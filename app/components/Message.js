import React from 'react'
import Colors from '../others/Colors'

const style = {
	main: {
		margin: '5px 0',
		display: 'flex',
		flexDirection: 'column',
		color: Colors.mainDark,
		border: `solid ${Colors.mainDark}`,
		borderWidth: '0',
	},
	inner: {
		background: Colors.mainDark,
		color: 'white',
		borderRadius: '6px',
		textAlign: 'left',
		padding: '5px 10px',
		width: 'auto',
		maxWidth: 'calc(100% - 50px)',
		display: 'inline-block',
	},
}
export default function Message({ style: customStyle, children, left, synced,
	error, removeMessage, resendMessage }) {
	const alignItems = left ? 'flex-start' : 'flex-end'
	const borderRadius = left ? { borderTopLeftRadius: '0px' } : { borderTopRightRadius: '0px' }
	const errorStyles = error
		? { borderWidth: '0 3px 0 0', paddingRight: '5px', marginBottom: '10px' }
		: {}
	const errorInfo = !error
		? ''
		: <div style={{ color: '#b44' }}>
			Message not sent
		</div>
	const errorActions = !error
		? ''
		: <div>
			<span
				style={{ marginRight: '8px', color: Colors.mainDark, cursor: 'pointer' }}
				onClick={ resendMessage }
			>
				<i className="fas fa-redo"></i> Retry
			</span>
			<span
				style={{ cursor: 'pointer' }}
				onClick={ removeMessage }
			>
				<i style={{ color: '#b44' }} className="fas fa-ban"></i> Discard
			</span>
		</div>
	return <div style={{ ...style.main, alignItems, ...errorStyles, ...customStyle }}>
		<div style={{ ...style.inner, ...borderRadius, opacity: synced ? 1 : 0.7 }}>
			{ children }
		</div>
		{ errorInfo }
		{ errorActions }
	</div>
}
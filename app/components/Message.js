import React from 'react'
import Colors from '../others/Colors'

const style = {
	main: {
		margin: '5px 0',
		display: 'flex',
		flexDirection: 'row',
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
export default function Message({ style: customStyle, children, left, synced }) {
	const justifyContent = left ? 'flex-start' : 'flex-end'
	const borderRadius = left ? { borderTopLeftRadius: '0px' } : { borderTopRightRadius: '0px' }
	return <div style={{ ...style.main, justifyContent, ...customStyle }}>
		<div style={{ ...style.inner, ...borderRadius, opacity: synced ? 1 : 0.7 }}>
			{ children }
		</div>
	</div>
}
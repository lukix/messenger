import React from 'react'
import Colors from '../others/Colors'
import Linkify from 'react-linkify'
import { css } from 'react-emotion'

const mainClass = css`
	margin: 5px 0
	display: flex
	flex-direction: column
	color: ${Colors.mainDark}
	border: solid ${Colors.mainDark}
	border-width: 0
	.inner {
		background: ${Colors.mainDark}
		color: white
		border-radius: 6px
		text-align: left
		padding: 5px 10px
		width: auto
		max-width: calc(100% - 50px)
		display: inline-block
	}
	.content {
		a {
			color: white
		}
	}
`
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
	return <div className={ mainClass } style={{ alignItems, ...errorStyles, ...customStyle }}>
		<div className="inner" style={{ ...borderRadius, opacity: synced ? 1 : 0.7 }}>
			<Linkify className="content">{ children }</Linkify>
		</div>
		{ errorInfo }
		{ errorActions }
	</div>
}
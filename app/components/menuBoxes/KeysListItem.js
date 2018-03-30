import React from 'react'
import moment from 'moment'
import { css } from 'react-emotion'
import Colors from '../../others/Colors'

const mainClass = css`
	margin-bottom: 10px
	.keyInputText {
		width: 100%
		background: transparent
		border: none
		color: white
		margin: 1px 0
	}
	.topBar {
		display: flex
		flex-direction: row
		justify-content: space-between
		align-items: center
	}
	.shareButton {
		border: none
		padding: 0 8px
		cursor: pointer
		border-radius: 4px
		background: white
		color: black
		height: 22px
		font-size: 0.9rem
		&:hover {
			background: ${Colors.mainLight}
		}
	}
`

const selectTarget = (event) => event.target.select()
export default function KeysBox({ publicKey, createdDate }) {
	const dateString = moment(createdDate).format('MMM Do, HH:mm:ss')
	return <div className={mainClass}>
		<div className="topBar">
			<span>{dateString}</span>
			<button className="shareButton"><i className="fas fa-link"></i> Share URL</button>
		</div>
		<input
			type="text"
			className="keyInputText"
			value={publicKey}
			onFocus={selectTarget}
			readOnly
		/>
	</div>
}
import React from 'react'
import Colors from '../others/Colors'

const style = {
	main: {
		background: 'white',
		boxShadow: `10px -10px 5px 0px ${Colors.shadow}`,
		margin: '20px 20px',
		textAlign: 'left',
		padding: '20px',
		color: Colors.textDark,
	},
}
export default function Card({ style: customStyle, children, className }) {
	return <div style={{ ...style.main, ...customStyle }} className={ className }>
		<div>{ children }</div>
	</div>
}
import React from 'react'
import Colors from '../others/Colors'

const style = {
	main: {
		background: 'white',
		width: '400px',
		minHeight: '50px',
		boxShadow: `10px -10px 5px 0px ${Colors.shadow}`,
		margin: '0px auto',
		marginTop: '40px',
		textAlign: 'left',
		padding: '20px',
		color: Colors.textDark,
	},
}
export default function Card({ style: customStyle, content }) {
	return <div style={{ ...style.main, ...customStyle }}>
		<div>{ content }</div>
	</div>
}
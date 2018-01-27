import React from 'react'
import Colors from '../others/Colors'

const style = {
	main: {
		background: 'rgba(0, 0, 0, 0.6)',
		height: '50px',
		width: '100%',
		boxSizing: 'border-box',
		color: Colors.textLight,
		fontSize: '1.3rem',
		padding: '0 20px',
		fontFamily: '"OpenSans"',
		fontWeight: 'lighter',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	menuItemsList: {
		listStyleType: 'none',
		display: 'flex',
		flexDirection: 'row',
		padding: '0',
		margin: '0',
	},
	menuItem: {
		padding: '0 30px 0 0',
		margin: '0',
		cursor: 'pointer',
		height: '50px',
		lineHeight: '50px',
	},
	notifications: {
		height: '50px',
		lineHeight: '50px',
		cursor: 'pointer',
	},
}

export default function MenuBar() {
	const menuItems = [
		{ label: 'My Keys', icon: 'fa-key' },
		{ label: 'Contacts', icon: 'fa-user' },
		{ label: 'Settings', icon: 'fa-cog' },
	]
	return <div style={ style.main }>
		<ul style={ style.menuItemsList }>
			{
				menuItems.map((item, index) =>
					<li key={ index } style={ style.menuItem }>
						{ <i className={`fa ${item.icon}`} aria-hidden="true"></i> }
						{' '}{ item.label }
					</li>
				)
			}
		</ul>
		<div style={ style.notifications }>
			<i className="fa fa-bell" aria-hidden="true"></i>
			{ ' Notifications' }
		</div>
	</div>
}
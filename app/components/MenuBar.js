import React from 'react'
import Colors from '../others/Colors'
import MediaQuery from 'react-responsive'
import KeysBox from './menuBoxes/KeysBox'

const style = {
	main: {
		background: Colors.semitransparentDark,
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
	menuItemsListContainer: {
		position: 'relative',
	},
	menuItem: {
		padding: '0 30px 0 0',
		margin: '0',
		cursor: 'pointer',
		height: '50px',
		lineHeight: '50px',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	menuItemContainer: {
		position: 'relative',
	},
	notifications: {
		height: '50px',
		lineHeight: '50px',
		cursor: 'pointer',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	label: {
		marginLeft: '7px',
	},
	dropdown: {
		background: Colors.semitransparentDark,
		color: Colors.textLight,
		position: 'absolute',
		zIndex: 2,
		top: '60px',
		left: '-10px',
		right: '20px',
		textAlign: 'left',
		padding: '15px',
		boxSizing: 'border-box',
	},
	arrow: (size) => ({
		width: 0,
		height: 0,
		borderLeft: `${size} solid transparent`,
		borderRight: `${size} solid transparent`,
		borderTop: `${size} solid ${Colors.semitransparentDark}`,
		position: 'absolute',
	}),
}

export default class MenuBar extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedItem: null,
		}
		this.handleItemClick = this.handleItemClick.bind(this)
	}
	handleItemClick(itemIndex) {
		return () => {
			this.setState({
				selectedItem: this.state.selectedItem === itemIndex ? null : itemIndex,
			})
		}
	}
	render() {
		const { selectedItem } = this.state
		const { keys, createNewKey } = this.props
		const menuItems = [
			{ label: 'My Keys', icon: 'fa-key' },
			{ label: 'Contacts', icon: 'fa-user' },
			{ label: 'Settings', icon: 'fa-cog' },
		]
		const menuBoxes = [
			<KeysBox keys={ keys } createNewKey={ createNewKey } />,
			<div>Contacts:</div>,
			<div>Settings:</div>,
		]
		return <div style={ style.main }>
			<div style={ style.menuItemsListContainer }>
				<ul style={ style.menuItemsList }>
					{
						menuItems.map((item, index) =>
							<li
								key={ index }
								style={ style.menuItemContainer }
								onClick={ this.handleItemClick(index) }
							>
								<div style={ style.menuItem }>
									{ <i className={`fa ${item.icon}`} aria-hidden="true"></i> }
									<MediaQuery minDeviceWidth={ 500 }>
										<span style={ style.label }>{ item.label }</span>
									</MediaQuery>
								</div>
								{
									index === selectedItem
										? <div style={ style.arrow('8px') }></div>
										: ''
								}
							</li>
						)
					}
				</ul>
				{
					selectedItem !== null
						? <div style={ style.dropdown }>{menuBoxes[selectedItem]}</div>
						: ''
				}
			</div>
			<div style={ style.notifications }>
				<i className="fa fa-bell" aria-hidden="true"></i>
				<MediaQuery minDeviceWidth={ 700 }>
					<span style={ style.label }>Notifications</span>
				</MediaQuery>
			</div>
		</div>
	}
}
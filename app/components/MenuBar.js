import React from 'react'
import Colors from '../others/Colors'
import MediaQuery from 'react-responsive'
import KeysBox from './menuBoxes/KeysBox'
import SettingsBox from './menuBoxes/SettingsBox'
import onClickOutside from 'react-onclickoutside'

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
		zIndex: 2,
		textAlign: 'left',
		padding: '15px',
		boxSizing: 'border-box',
	},
	dropdownNormal: {
		position: 'absolute',
		top: '60px',
		left: '-10px',
		right: '20px',
		minWidth: '380px',
	},
	dropdownMobile: {
		position: 'absolute',
		top: '60px',
		left: '-10px',
		width: 'calc(100vw - 20px)',
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
		const clickOutsideConfig = { handleClickOutside: () => this.handleOutsideItemClick }
		this.state = {
			selectedItem: null,
			clickOutsideComponents: {
				KeysBox: onClickOutside(KeysBox, clickOutsideConfig),
				SettingsBox: onClickOutside(SettingsBox, clickOutsideConfig),
			},
		}
		this.handleItemClick = this.handleItemClick.bind(this)
		this.handleOutsideItemClick = this.handleOutsideItemClick.bind(this)
	}
	handleItemClick(itemIndex) {
		return () => {
			this.setState({
				selectedItem: this.state.selectedItem === itemIndex ? null : itemIndex,
			})
		}
	}
	handleOutsideItemClick() {
		this.setState({
			selectedItem: null,
		})
	}
	render() {
		const { selectedItem, clickOutsideComponents } = this.state
		const { keys, createNewKey, wipeAppData, keyRequestInProgress,
			messageSoundOn, setMessageSoundOn } = this.props
		const menuItems = [
			{ label: 'My Keys', icon: 'fas fa-key' },
			{ label: 'Settings', icon: 'fas fa-cog' },
		]
		const menuBoxes = [
			<clickOutsideComponents.KeysBox
				keys={ keys }
				createNewKey={ createNewKey }
				keyRequestInProgress={ keyRequestInProgress }
				eventTypes="click"
			/>,
			<clickOutsideComponents.SettingsBox
				wipeAppData={ wipeAppData }
				messageSoundOn={ messageSoundOn }
				setMessageSoundOn={ setMessageSoundOn }
				eventTypes="click"
			/>,
		]
		const dropdownStyle = (mobile) => ({
			...style.dropdown,
			...(mobile ? style.dropdownMobile : style.dropdownNormal),
		})
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
									{ <i className={ item.icon }></i> }
									<MediaQuery minDeviceWidth={ 400 }>
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
					selectedItem === null
						? ''
						: <MediaQuery minDeviceWidth={500}>
							{ (matches) => <div style={ dropdownStyle(!matches) }>
								{ menuBoxes[selectedItem] }
							</div> }
						</MediaQuery>
				}
			</div>
			<div style={ style.notifications }>
				{ /*
				<i className="fas fa-bell"></i>
				<MediaQuery minDeviceWidth={ 700 }>
					<span style={ style.label }>Notifications</span>
				</MediaQuery>
				*/ }
			</div>
		</div>
	}
}